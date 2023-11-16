import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col className="text-left">
          <h5>Campus Concert</h5>
          <ul className="list-unstyled">
            <li><Link to="/userhome">Home</Link></li>
            <li><Link to="/browse-all-profiles">Browse Profiles</Link></li>
            <li><Link to="*">Create a Concert</Link></li>
            <li><Link to="*">Browse Concerts</Link></li>
          </ul>
        </Col>
        <Col className="text-left">
          <h5>Musical Tastes</h5>
          <ul className="list-unstyled">
            <li><Link to="*">Jazz</Link></li>
            <li><Link to="*">Rock</Link></li>
            <li><Link to="*">Pop</Link></li>
          </ul>
        </Col>
        <Col className="text-left">
          <h5>About</h5>
          <ul className="list-unstyled">
            <li>Phone: (555) 123-4567</li>
            <li className="pb-2">Email: fakeemail@email.com</li>
            <li><Link to="/contact-page" className="btn btn-primary">Contact Us</Link></li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
