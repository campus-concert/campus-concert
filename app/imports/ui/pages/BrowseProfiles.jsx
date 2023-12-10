import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Dropdown, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Funnel } from 'react-bootstrap-icons';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileBasic from '../components/ProfileBasic';

const BrowseProfiles = () => {

  const [locationFilter, setLocationFilter] = useState('all locations');
  const [instrumentFilter, setInstrumentFilter] = useState('all instruments');
  const [tasteFilter, setTasteFilter] = useState('all tastes');
  const [displayedProfiles, setDisplayedProfiles] = useState(6);

  const locations = ['all locations'].concat(Profiles.allowedLocations);
  const instruments = ['all instruments'].concat(Profiles.allowedInstruments);
  const tastes = ['all tastes'].concat(Profiles.allowedTastes);

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
    if (locationFilter === 'all locations') {
      return list;
    }
    return list.filter((profile) => profile.location === locationFilter);
  };

  const filterInstruments = (list) => {
    if (instrumentFilter !== 'all instruments') {
      return list.filter((profile) => profile.instruments.includes(instrumentFilter));
    }
    return list;
  };

  const filterTastes = (list) => {
    if (tasteFilter !== 'all tastes') {
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

  const resetFilters = () => {
    setLocationFilter('all locations');
    setInstrumentFilter('all instruments');
    setTasteFilter('all tastes');
    setDisplayedProfiles(6);
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
          <Card className="p-4 mb-4">
            <Col className="text-center mb-2">
              <h2>Browse Profiles</h2>
            </Col>
            <div className="filter-card mb-5">
              <Row>
                <Col className="text-start">
                  <h5>
                    <span style={{ paddingRight: '0.2em' }}>
                      <Funnel />
                    </span>
                    Sort by:
                  </h5>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-location"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {locationFilter !== 'all locations' ? locationFilter : 'All Locations'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {locations.map((location, index) => (
                        <Dropdown.Item key={index} onClick={() => setLocationFilter(location)}>
                          {location}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-taste"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {tasteFilter !== 'all tastes' ? tasteFilter : 'All Tastes'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {tastes.map((taste, index) => (
                        <Dropdown.Item key={index} onClick={() => setTasteFilter(taste)}>
                          {taste}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-instrument"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {instrumentFilter !== 'all instruments' ? instrumentFilter : 'All Instruments'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {instruments.map((instrument, index) => (
                        <Dropdown.Item key={index} onClick={() => setInstrumentFilter(instrument)}>
                          {instrument}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className="mb-1">
                  <Button onClick={resetFilters} variant="outline-secondary" style={{ fontSize: '1rem', padding: '0.2rem 0.4rem' }}>
                    Reset Filters
                  </Button>
                </Col>
              </Row>
            </div>
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
