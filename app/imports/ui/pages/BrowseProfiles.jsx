import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Dropdown } from 'react-bootstrap';
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
    console.log('Filtering by location: ', locationFilter);
    if (locationFilter === 'All locations') {
      console.log('Inside if statement');
      return list;
    }
    console.log('Outside if statement');
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
    console.log('Done filtering. Profiles are now: ', filtering);
  };

  const updateLocationFilter = (location) => {
    setLocationFilter(location);
    filterProfiles();
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
                <h4>Filter by Location:</h4>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-location">
                    {locationFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => updateLocationFilter('All locations')}>
                      All locations
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => updateLocationFilter('Honolulu')}>
                      Honolulu
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => updateLocationFilter('Pearl City')}>
                      Pearl City
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => updateLocationFilter('Kailua')}>
                      Kailua
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredProfiles.map((profile, index) => (
                <Col key={index}>
                  <ProfileBasic profile={profile} />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BrowseProfiles;
