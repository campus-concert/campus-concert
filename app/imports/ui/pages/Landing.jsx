import React from 'react';
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome to this template</h1>
        <p>Now get to work and modify this app!</p>
        <br />
        <br />
        <Nav.Link id="user-profile" as={NavLink} to="/userprofile-mockup" key="userprofile"><h4>Mockup of A User Profile</h4> </Nav.Link>
      </Col>

    </Row>
  </Container>
);

export default Landing;
