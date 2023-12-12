import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer id="footer" className="mt-auto py-3 bg-light text-white">
    <Container>
      <Row>
        <Col className="text-left">
          <h5>Campus Concert</h5>
          <ul className="list-unstyled">
            <li><Link id="userhome-footer" className="text-white" to="/userhome">Home</Link></li>
            <li><Link id="userprofile-footer" className="text-white" to="/userprofile">View My Profile</Link></li>
            <li><Link id="myconcerts-footer" className="text-white" to="/my-concerts">View My Concerts</Link></li>
            <li><Link id="bookmarks-footer" className="text-white" to="/bookmarked-concerts">View Bookmarks</Link></li>
          </ul>
        </Col>
        <Col className="text-left">
          <h5>Browse Other</h5>
          <ul className="list-unstyled">
            <li><Link id="create-concert-footer" className="text-white" to="/create-concert">Create a Concert</Link></li>
            <li><Link id="browse-profiles-footer" className="text-white" to="/browse-all-profiles">Browse Profiles</Link></li>
            <li><Link id="browse-concerts-footer" className="text-white" to="/browse-all-concerts">Browse Concerts</Link></li>
          </ul>
        </Col>
        <Col className="text-left">
          <h5>Contact</h5>
          <ul className="list-unstyled">
            <li>Phone: (555) 123-4567</li>
            <li className="pb-2">Email: campusconcert@email.com</li>
            <li><Link id="contact-button" to="/contact-page" className="btn btn-primary">Contact Us</Link></li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
