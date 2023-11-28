import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';
import ConcertBasic from '../components/ConcertBasic';

const BrowseConcerts = () => {

  const { ready, concerts } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.userPublicationName);
    const rdy = subscription.ready();
    const concertItems = Concerts.collection.find({}).fetch();
    return {
      concerts: concertItems,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Card className="p-4 mb-4"> {/* Stylish box added here */}
            <Col className="text-center">
              <h2>Browse Concerts</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {concerts.map((concert, index) => (
                <Col key={index}>
                  <ConcertBasic concert={concert} showDetailsLink />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BrowseConcerts;
