import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { Profiles } from '../../api/profile/Profile';
import Profile from '../components/Profile';
import LoadingSpinner from '../components/LoadingSpinner';

const UserProfile = () => {
  const { userId } = useParams(); // Get the userId from the route parameter
  let { ready, userProfile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userProf = Profiles.collection.findOne({ _id: userId });
    return {
      userProfile: userProf,
      ready: rdy,
    };
  });

  // Set the page title based on the user's first and last name
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
          <Col className="text-center">
            <h2>{pageTitle}</h2>
          </Col>
          <Profile profile={userProfile} own={own} />
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserProfile;
