import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const Concert = ({ concert }) => {

  if (!concert) {
    return <div>No Concert found</div>;
  }

  return (
    <Card className="d-flex flex-column h-100">
      <Card.Header className="bg-dark text-white text-center position-relative">
        <Card.Title className="my-2">{concert.concertName}</Card.Title>
      </Card.Header>
      <Card.Body className="flex-grow-1">
        <div className="d-flex flex-column">
          <div className="mb-2">
            <Card.Text>
              <h5>Instruments Needed:</h5>{concert.instrumentsNeeded.join(', ')}
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text>
              <h5>Musical Genres:</h5>{concert.genres.join(', ')}
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text>
              <h5>Date:</h5>{concert.date}
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text>
              <h5>Time:</h5>{concert.time}
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text>
              <h5>Location:</h5>{concert.concertLocation}
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text><h5>Contact:</h5>{concert.contact}</Card.Text>
          </div>
          <Card.Text id="concert-description" className="my-2"><h5>Description:</h5>{concert.concertDescription}</Card.Text>
        </div>
        {Meteor.user() && Meteor.user().emails[0].address === concert.owner ? (
          <Card.Footer>
            <Link id="edit-concert-button" to={`/edit-concert/${concert._id}`}>Edit</Link>
          </Card.Footer>
        ) : (
          <Card.Body>
            <Link to={`/comment/${concert._id}`}>
              <Button variant="primary" size="md" className="mt-3">
                Comment
              </Button>
            </Link>
          </Card.Body>
        )}
      </Card.Body>
    </Card>
  );
};

Concert.propTypes = {
  concert: PropTypes.shape({
    concertName: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    instrumentsNeeded: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
    concertLocation: PropTypes.string,
    concertDescription: PropTypes.string,
    contact: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Concert;
