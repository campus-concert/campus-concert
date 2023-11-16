import React from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { PeopleFill, People } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-5">
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <Card className="mb-4">
          <Card.Body id="card-body">
            <h1>Welcome to Campus Concerts</h1>
            <h5>Share the World!</h5>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <Card>
          <Card.Body id="card-body" className="mb-3">
            <People size={100} />
            <h1>Create a Profile</h1>
            <h6>Create a Profile to share your interests on your skills, type of intstrument and etc.</h6>
            <Button id="login-dropdown-sign-up" as={NavLink} to="/signup">Sign Up</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={4} className="text-center">
        <Card>
          <Card.Body id="card-body" className="mb-3">
            <PeopleFill size={100} />
            <h1>Connect with Others</h1>
            <h6>Connect with others by looking at other profiles and sharing your interests with each other.</h6>
            <Button id="login-dropdown-sign-in" as={NavLink} to="/signin">Sign In</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Landing;
