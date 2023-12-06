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
  const [filteredProfiles, setFilteredProfiles] = useState();

  const { ready, profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const profileItems = Profiles.collection.find({}).fetch();
    setFilteredProfiles(profileItems);
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  const filterLocation = (list) => {
    if (locationFilter === 'All locations') {
      return list;
    }
    return list.filter((profile) => (profile.location === locationFilter));
  };

  const filterInstruments = (list) => {
    if (instrumentFilter !== 'All instruments') {
      return list.filter((profile) => (profile.instruments.includes(instrumentFilter)));
    }
    return list;
  };

  const filterTastes = (list) => {
    if (tasteFilter !== 'All tastes') {
      return list.filter((profile) => (profile.tastes.includes(tasteFilter)));
    }
    return list;
  };

  const filterProfiles = () => {
    let filtering = filterLocation(profiles);
    filtering = filterInstruments(filtering);
    filtering = filterTastes(filtering);
    setFilteredProfiles(filtering);
  };

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
                    <Dropdown.Item onClick={() => setLocationFilter('All locations')}>
                      All locations
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setLocationFilter('Honolulu')}>
                      Honolulu
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setLocationFilter('Pearl City')}>
                      Pearl City
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setLocationFilter('Kailua')}>
                      Kailua
                    </Dropdown.Item>
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
                    <Dropdown.Item onClick={() => setInstrumentFilter('All instruments')}>
                      All instruments
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setInstrumentFilter('guitar')}>
                      Guitar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setInstrumentFilter('flute')}>
                      Flute
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setInstrumentFilter('piano')}>
                      Piano
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setInstrumentFilter('trumpet')}>
                      Trumpet
                    </Dropdown.Item>
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
                    <Dropdown.Item onClick={() => setTasteFilter('All tastes')}>
                      All tastes
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setTasteFilter('rock')}>
                      Rock
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setTasteFilter('pop')}>
                      Pop
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setTasteFilter('hip-hop')}>
                      Hip-hop
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setTasteFilter('jazz')}>
                      Jazz
                    </Dropdown.Item>
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
              <h2>No profile match this filtering</h2>
              : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {filteredProfiles.map((profile, index) => (
                    <Col key={index}>
                      <ProfileBasic profile={profile} />
                    </Col>
                  ))}
                </Row>
              )}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BrowseProfiles;
