import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Row } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Row className="justify-content-center">
      <Col xs={4} id="signout-page" className="justify-content-center py-3">
        <Card>
          <Card.Body className="text-center">
            <h2>You are signed out.</h2>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignOut;
