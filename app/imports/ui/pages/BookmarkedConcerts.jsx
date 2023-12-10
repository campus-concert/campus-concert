import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';
import ConcertBasic from '../components/ConcertBasic';

const BookmarkedConcerts = () => {
  const { ready, bookmarkedConcerts } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.bookmarkedPublicationName);
    const rdy = subscription.ready();
    const concertItems = Concerts.collection.find({
      bookmarks: {
        $elemMatch: {
          userId: Meteor.userId(),
          state: true,
        },
      },
    }).fetch();
    return {
      bookmarkedConcerts: concertItems,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container id="browse-all-concerts" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Card className="p-4 mb-4">
            <Col className="text-center">
              <h2>Bookmarked Concerts</h2>
            </Col>
            {bookmarkedConcerts.length > 0 ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {bookmarkedConcerts.map((concert, index) => (
                  <Col key={index}>
                    <ConcertBasic concert={concert} showDetailsLink />
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="mt-3">
                You have no bookmarked Concerts.
              </p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default BookmarkedConcerts;
