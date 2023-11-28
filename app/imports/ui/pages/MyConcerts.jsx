import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';
import ConcertBasic from '../components/ConcertBasic';

const MyConcerts = () => {
  const navigate = useNavigate();
  const userId = Meteor.userId();

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

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Card className="p-4 mb-4">
            <Col className="text-center">
              <h2>My Concerts</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {userConcerts.map((concert) => (
                <Col key={concert._id}>
                  <ConcertBasic
                    concert={concert}
                    showDetailsLink
                    onClick={() => navigate(`/my-concerts/${concert._id}`)}
                  />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default MyConcerts;
