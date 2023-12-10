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
  const { admin } = useParams();
  const { ready, userProfile, editMode } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    let userProf = Profiles.collection.findOne({ _id: userId });
    let edit = false;

    if (!userId && Meteor.user() && rdy) {
      userProf = Profiles.collection.findOne({ contact: Meteor.user().username });
      edit = true;
    }

    if (admin) {
      edit = true;
    }

    return {
      userProfile: userProf,
      ready: rdy,
      editMode: edit,
    };
  });

  let pageTitle;
  if (!ready) {
    pageTitle = <LoadingSpinner />;
  } else if (!userId && Meteor.user()) {
    pageTitle = 'My Profile';
  } else if (userProfile) {
    pageTitle = `${userProfile.firstName} ${userProfile.lastName}'s Profile`;
  } else {
    pageTitle = 'User Profile';
  }

  return ready ? (
    <Container id="user-profile-page" className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Card className="p-4 mb-4"> {/* Stylish box added here */}
            <Col className="text-center">
              <h2>{pageTitle}</h2>
            </Col>
            <Profile profile={userProfile} edit={editMode} />
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserProfile;
