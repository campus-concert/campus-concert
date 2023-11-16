import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Profiles } from '../../api/profile/Profile';
import Profile from '../components/Profile';
import LoadingSpinner from '../components/LoadingSpinner';

const UserProfile = () => {
  const { userId } = useParams();
  // eslint-disable-next-line prefer-const
  let { ready, userProfile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userProf = Profiles.collection.findOne({ _id: userId });
    return {
      userProfile: userProf,
      ready: rdy,
    };
  });

  const pageTitle = userProfile ? `${userProfile.firstName} ${userProfile.lastName}'s Profile` : 'User Profile';
  let own = false;
  if (!userId && Meteor.user()) {
    userProfile = Profiles.collection.findOne({ contact: Meteor.user().username });
    own = true;
  }

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Card className="p-4 mb-4"> {/* Stylish box added here */}
            <Col className="text-center">
              <h2>{pageTitle}</h2>
            </Col>
            <Profile profile={userProfile} own={own} />
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserProfile;
