import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StarFill, Star } from 'react-bootstrap-icons';

const ConcertBasic = ({ concert, admin }) => {
  const toggleBookmark = () => {
    const newBookmarkState = !concert.bookmarks || !concert.bookmarks.some(e => e.userId === Meteor.userId() && e.state);
    console.log(newBookmarkState);
    Meteor.call('bookmarkConcert', concert._id, newBookmarkState, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }
  return (
  <Card className="d-flex flex-column h-100">
    <Card.Header className="bg-dark text-white text-center position-relative">
      <Card.Title className="my-2">{concert.concertName} </Card.Title>
      <Button
          variant={concert.bookmarks && concert.bookmarks.some(e => e.userId === Meteor.userId() && e.state) ? 'success' : 'outline-secondary'}
          size="sm"
          className="position-absolute top-0 end-0 m-2"
          onClick={toggleBookmark}
        >
          {concert.bookmark ? <StarFill /> : <Star />}
        </Button>
    </Card.Header>
    <Card.Body className="flex-grow-1">
      <div className="d-flex flex-column">
        <div className="mb-2">
          <Card.Text><h5>Instruments Needed:</h5>{concert.instrumentsNeeded.join(', ')}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Musical Genres:</h5>{concert.genres.join(', ')}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Date:</h5>{concert.date}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Time:</h5>{concert.time}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Location:</h5>{concert.concertLocation}</Card.Text>
        </div>
        <div className="d-flex justify-content-center">
          {admin ? (
            <Link to={`/userconcert/admin/${concert._id}`}>
              <Button variant="primary" size="md">
                View Details
              </Button>
            </Link>
          ) : (
            <Link to={`/userconcert/${concert._id}`}>
              <Button variant="primary" size="md">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card.Body>
  </Card>
  );
};

ConcertBasic.propTypes = {
  concert: PropTypes.shape({
    concertName: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    instrumentsNeeded: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
    concertLocation: PropTypes.string,
    _id: PropTypes.string,
    bookmark: PropTypes.object,
  }).isRequired,
  admin: PropTypes.bool,
};

ConcertBasic.defaultProps = {
  admin: false,
};

export default ConcertBasic;
