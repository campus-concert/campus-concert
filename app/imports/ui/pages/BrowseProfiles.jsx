import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in v6
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileBasic from '../components/ProfileBasic';

const BrowseProfiles = () => {
  const navigate = useNavigate(); // useNavigate replaces useHistory in v6

  const { ready, profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Browse Profiles</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {profiles.map((profile, index) => (
              <Col key={index}>
                <ProfileBasic profile={profile} showDetailsLink onClick={() => navigate(`/profile/${profile._id}`)} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BrowseProfiles;
