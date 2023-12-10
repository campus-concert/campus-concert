import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';
import ConcertBasic from '../components/ConcertBasic';

const BookmarkedConcerts = () => {
  const itemsPerPage = 6;
  const [visibleConcerts, setVisibleConcerts] = useState(itemsPerPage);

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

  const loadMore = () => {
    setVisibleConcerts((prev) => prev + itemsPerPage);
  };

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
                {bookmarkedConcerts.slice(0, visibleConcerts).map((concert, index) => (
                  <Col key={index}>
                    <ConcertBasic concert={concert} showDetailsLink />
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="mt-3">You have no bookmarked Concerts.</p>
            )}
            {visibleConcerts < bookmarkedConcerts.length && (
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
  ) : (
    <LoadingSpinner />
  );
};

export default BookmarkedConcerts;
