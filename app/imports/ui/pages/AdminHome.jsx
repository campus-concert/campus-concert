import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PersonCircle, MusicNote, ChatLeftText } from 'react-bootstrap-icons';

const AdminHome = () => (
  <Container id="adminhome-page" className="mt-5 mb-5 rounded gray-background p-4">
    <Row className="justify-content-center mb-4">
      {/* Welcome Title */}
      <Col xs={12} className="text-center">
        <h1 className="welcome-title">Welcome Administrator</h1>
      </Col>
    </Row>

    <Row className="justify-content-center">
      {/* Edit Profiles Box */}
      <Col xs={10} sm={8} md={6} lg={4} className="mb-4">
        <Link to="/admin-browse-profiles" className="text-decoration-none">
          <div id="adminhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
            <PersonCircle size={60} className="box-icon mb-3" />
            <h3 id="edit-profiles" className="box-title">Edit Profiles</h3>
          </div>
        </Link>
      </Col>
      {/* Edit Concerts Box */}
      <Col xs={10} sm={8} md={6} lg={4} className="mb-4">
        <Link to="/admin-browse-concerts" className="text-decoration-none">
          <div id="adminhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
            <MusicNote size={60} className="box-icon mb-3" />
            <h3 id="edit-concerts" className="box-title">Edit Concerts</h3>
          </div>
        </Link>
      </Col>
    </Row>

    <Row className="justify-content-center">
      {/* View User Comments Box */}
      <Col xs={10} sm={8} md={6} lg={4} className="mb-4">
        <Link to="/admin-comments" className="text-decoration-none">
          <div id="adminhome-button" className="home-box text-center rounded p-4 border-thick text-black bg-white">
            <ChatLeftText size={60} className="box-icon mb-3" />
            <h3 id="user-comments" className="box-title">View User Comments</h3>
          </div>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default AdminHome;
