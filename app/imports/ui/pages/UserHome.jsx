import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PersonCircle, People, MusicNote, MusicNoteBeamed } from 'react-bootstrap-icons';

const UserHome = () => (
  <Container className="mt-5">
    <Row className="justify-content-center">
      {/* Edit Profile Box */}
      <Col md={6} className="mb-4">
        <Link to="/edit-profile" className="text-decoration-none">
          <div className="home-box text-center rounded">
            <PersonCircle size={60} className="box-icon mb-3" />
            <h4 className="box-title">Edit My Profile</h4>
          </div>
        </Link>
      </Col>

      {/* Create/Edit Concert Box */}
      <Col md={6} className="mb-4">
        <Link to="/create-edit-concert" className="text-decoration-none">
          <div className="home-box text-center rounded">
            <MusicNote size={60} className="box-icon mb-3" />
            <h4 className="box-title">Create/Edit a Concert</h4>
          </div>
        </Link>
      </Col>
    </Row>

    <Row className="justify-content-center">
      {/* Browse All Profiles Box */}
      <Col md={6} className="mb-4">
        <Link to="/browse-all-profiles" className="text-decoration-none">
          <div className="home-box text-center rounded">
            <People size={60} className="box-icon mb-3" />
            <h4 className="box-title">Browse All Profiles</h4>
          </div>
        </Link>
      </Col>

      {/* Browse All Concerts Box */}
      <Col md={6} className="mb-4">
        <Link to="/browse-all-concerts" className="text-decoration-none">
          <div className="home-box text-center rounded">
            <MusicNoteBeamed size={60} className="box-icon mb-3" />
            <h4 className="box-title">Browse All Concerts</h4>
          </div>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default UserHome;
