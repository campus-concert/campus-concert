import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PersonCircle, People, MusicNote, MusicNoteBeamed } from 'react-bootstrap-icons';

const UserHome = () => (
  <Container id="userhome-page" className="mt-5 mb-5 gray-background">
    <Row className="justify-content-center mb-4">
      {/* Welcome Title */}
      <Col xs={12} className="text-center">
        <h1 className="welcome-title">Welcome to Campus Concert</h1>
      </Col>
    </Row>

    <Row className="justify-content-center">
      {/* Edit Profile Box */}
      <Col xs={10} sm={8} md={6} lg={4} className="mb-4">
        <Link to="/userprofile" className="text-decoration-none">
          <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
            <PersonCircle size={60} className="box-icon mb-3" />
            <h3 id="view-profile" className="box-title">View My Profile</h3>
          </div>
        </Link>
      </Col>

      {/* Create/Edit Concert Box */}
      <Col xs={10} sm={8} md={6} lg={4} className="mb-4">
        <Link to="/createconcert" className="text-decoration-none">
          <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
            <MusicNote size={60} className="box-icon mb-3" />
            <h3 id="create-edit-concert" className="box-title">Create/Edit a Concert</h3>
          </div>
        </Link>
      </Col>
    </Row>

    <Row className="justify-content-center">
      {/* Browse All Profiles Box */}
      <Col xs={10} sm={8} md={6} lg={4} className="mb-4">
        <Link to="/browse-all-profiles" className="text-decoration-none">
          <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
            <People size={60} className="box-icon mb-3" />
            <h3 id="browse-profiles" className="box-title">Browse All Profiles</h3>
          </div>
        </Link>
      </Col>

      {/* Browse All Concerts Box */}
      <Col xs={10} sm={8} md={6} lg={4} className="mb-4">
        <Link to="/browse-all-concerts" className="text-decoration-none">
          <div id="userhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
            <MusicNoteBeamed size={60} className="box-icon mb-3" />
            <h3 id="browse-concerts" className="box-title">Browse All Concerts</h3>
          </div>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default UserHome;
