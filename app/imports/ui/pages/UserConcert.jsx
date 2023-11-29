import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Concerts } from '../../api/concert/Concert';
import Concert from '../components/Concert';
import LoadingSpinner from '../components/LoadingSpinner';

const UserConcert = () => {
  const { userId } = useParams();
  const { admin } = useParams();
  // eslint-disable-next-line prefer-const
  let { ready, userConcert } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.userPublicationName);
    const rdy = subscription.ready();
    const userCon = Concerts.collection.findOne({ _id: userId });
    return {
      userConcert: userCon,
      ready: rdy,
    };
  });

  const pageTitle = userConcert
    ? `Posted by: ${userConcert.owner}`
    : 'User Concert';
  let edit = false;
  if (Meteor.user()) {
    edit = userConcert.owner === Meteor.user().username;
  }
  if (admin) {
    edit = true;
  }

  return ready ? (
    <Container id="user-concert-page" className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Card className="p-4 mb-4"> {/* Stylish box added here */}
            <Col className="text-center">
              <h2>{pageTitle}</h2>
            </Col>
            <Concert concert={userConcert} edit={edit} />
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default UserConcert;
