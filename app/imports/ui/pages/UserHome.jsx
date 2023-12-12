import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PersonCircle, People, MusicNote, MusicNoteBeamed, Boombox, Star } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';

const UserHome = () => {
  const userEmail = Meteor.user()?.emails?.[0]?.address;
  const { ready, userProfile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userProf = userEmail ? Profiles.collection.findOne({ contact: userEmail }) : undefined;
    return {
      userProfile: userProf,
      ready: rdy,
    };
  });

  const userName = userProfile ? `${userProfile.firstName}` : 'User Profile';

  return ready ? (
    <Container id="userhome-page" className="mt-5 mb-5 rounded gray-background p-4">
      <Row className="justify-content-center mb-4">
        <Col xs={12} className="text-center">
          <h1 className="welcome-title">Welcome to Campus Concert, {userName}!</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={10} sm={6} md={4} lg={3} className="mb-4">
          <Link to="/userprofile" className="text-decoration-none">
            <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
              <PersonCircle size={60} className="box-icon mb-3" />
              <h3 id="view-profile" className="box-title">View My Profile</h3>
            </div>
          </Link>
        </Col>

        <Col xs={10} sm={6} md={4} lg={3} className="mb-4">
          <Link to="/my-concerts" className="text-decoration-none">
            <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
              <MusicNote size={60} className="box-icon mb-3" />
              <h3 id="my-concert" className="box-title">View My Concerts</h3>
            </div>
          </Link>
        </Col>

        <Col xs={10} sm={6} md={4} lg={3} className="mb-4">
          <Link to="/bookmarked-concerts" className="text-decoration-none">
            <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
              <Star size={60} className="box-icon mb-3" />
              <h3 id="bookmarked-concerts" className="box-title">View Bookmarks</h3>
            </div>
          </Link>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={10} sm={6} md={4} lg={3} className="mb-4">
          <Link to="/create-concert" className="text-decoration-none">
            <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
              <Boombox size={60} className="box-icon mb-3" />
              <h3 id="create-concert" className="box-title">Create a Concert</h3>
            </div>
          </Link>
        </Col>

        <Col xs={10} sm={6} md={4} lg={3} className="mb-4">
          <Link to="/browse-all-profiles" className="text-decoration-none">
            <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
              <People size={60} className="box-icon mb-3" />
              <h3 id="browse-profiles" className="box-title">Browse Profiles</h3>
            </div>
          </Link>
        </Col>

        <Col xs={10} sm={6} md={4} lg={3} className="mb-4">
          <Link to="/browse-all-concerts" className="text-decoration-none">
            <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
              <MusicNoteBeamed size={60} className="box-icon mb-3" />
              <h3 id="browse-concerts" className="box-title">Browse Concerts</h3>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserHome;
