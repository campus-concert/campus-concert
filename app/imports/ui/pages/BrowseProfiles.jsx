import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Dropdown, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileBasic from '../components/ProfileBasic';

const BrowseProfiles = () => {

  const [locationFilter, setLocationFilter] = useState('All locations');
  const [instrumentFilter, setInstrumentFilter] = useState('All instruments');
  const [tasteFilter, setTasteFilter] = useState('All tastes');
  const [displayedProfiles, setDisplayedProfiles] = useState(6);

  const locations = ['All locations'].concat(Profiles.allowedLocations);
  const instruments = ['All instruments'].concat(Profiles.allowedInstruments);
  const tastes = ['All tastes'].concat(Profiles.allowedTastes);

  const { ready, profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const profileItems = Profiles.collection.find({}).fetch().sort((a, b) => (a.firstName.localeCompare(b.firstName)));
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  const filterLocation = (list) => {
    if (locationFilter === 'All locations') {
      return list;
    }
    return list.filter((profile) => profile.location === locationFilter);
  };

  const filterInstruments = (list) => {
    if (instrumentFilter !== 'All instruments') {
      return list.filter((profile) => profile.instruments.includes(instrumentFilter));
    }
    return list;
  };

  const filterTastes = (list) => {
    if (tasteFilter !== 'All tastes') {
      return list.filter((profile) => profile.tastes.includes(tasteFilter));
    }
    return list;
  };

  const filterProfiles = () => {
    let filtering = filterLocation(profiles);
    filtering = filterInstruments(filtering);
    filtering = filterTastes(filtering);
    return filtering;
  };

  const loadMore = () => {
    setDisplayedProfiles((prevCount) => prevCount + 6);
  };

  const filteredProfiles = filterProfiles();
  const visibleProfiles = filteredProfiles.slice(0, displayedProfiles);

  return ready ? (
    <Container id="browse-profiles-page" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Card className="p-4 mb-4"> {/* Stylish box added here */}
            <Col className="text-center">
              <h2>Browse Profiles</h2>
            </Col>
            <Row>
              <Col>
                <h5>Filter by Location:</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-location">
                    {locationFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {locations.map((location, index) => (
                      <Dropdown.Item key={index} onClick={() => setLocationFilter(location)}>
                        {location}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <h5>Filter by instrument:</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-location">
                    {instrumentFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {instruments.map((instrument, index) => (
                      <Dropdown.Item key={index} onClick={() => setInstrumentFilter(instrument)}>
                        {instrument}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <h5>Filter by tastes:</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-location">
                    {tasteFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {tastes.map((taste, index) => (
                      <Dropdown.Item key={index} onClick={() => setTasteFilter(taste)}>
                        {taste}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <Button onClick={filterProfiles} variant="secondary">
                  Apply Filters
                </Button>
              </Col>
            </Row>
            {(filteredProfiles.length === 0) ?
              <h2>No profiles match this filtering</h2>
              : (
                <>
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {visibleProfiles.map((profile, index) => (
                      <Col key={index}>
                        <ProfileBasic profile={profile} />
                      </Col>
                    ))}
                  </Row>
                  {displayedProfiles < filteredProfiles.length && (
                    <Row className="justify-content-center mt-4">
                      <Button onClick={loadMore} variant="outline-primary" style={{ width: 'fit-content' }}>
                        Load More
                      </Button>
                    </Row>
                  )}
                </>
              )}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BrowseProfiles;
