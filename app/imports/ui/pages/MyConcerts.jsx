import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';
import ConcertBasic from '../components/ConcertBasic';

const MyConcerts = () => {
  const userId = Meteor.userId();
  const itemsPerPage = 6; // Adjust this based on your preference
  const [visibleConcerts, setVisibleConcerts] = useState(itemsPerPage);

  const { ready, userConcerts } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.userPublicationName);
    const rdy = subscription.ready();

    // Only fetch concerts owned by the logged-in user
    const userConcertItems = Concerts.collection.find({ owner: Meteor.user()?.emails[0].address }).fetch();
    return {
      userConcerts: userConcertItems,
      ready: rdy,
    };
  }, [userId]); // Make sure to include userId in the dependency array

  const loadMore = () => {
    setVisibleConcerts((prev) => prev + itemsPerPage);
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Card className="p-4 mb-4">
            <Col className="text-center">
              <h2>My Concerts</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {userConcerts.slice(0, visibleConcerts).map((concert) => (
                <Col key={concert._id}>
                  <ConcertBasic concert={concert} />
                </Col>
              ))}
            </Row>
            {visibleConcerts < userConcerts.length && (
              <Row className="justify-content-center mt-4">
                <Button onClick={loadMore} variant="outline-primary" style={{ width: 'fit-content' }}>
                  Load More
                </Button>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default MyConcerts;
