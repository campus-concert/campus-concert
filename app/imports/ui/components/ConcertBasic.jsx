// ConcertBasic.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ConcertBasic = ({ concert, showDetailsLink }) => (
  <Card className="d-flex flex-column h-100">
    <Card.Header className="bg-dark text-white text-center position-relative">
      <Image src={concert.image} roundedCircle width={200} className="mt-3" />
      <Card.Title className="my-2">{concert.owner}</Card.Title>
      <Card.Title className="my-2">{concert.concertName} </Card.Title>
    </Card.Header>
    <Card.Body className="flex-grow-1">
      <div className="d-flex flex-column">
        <div className="mb-2">
          <Card.Text><h5>Instruments:</h5>{concert.instruments.join(', ')}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Musical Tastes:</h5>{concert.tastes.join(', ')}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Location:</h5>{concert.location}</Card.Text>
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
        {showDetailsLink && (
          <div className="d-flex justify-content-center">
            <Link to={`/userprofile/${concert._id}`}>
              <Button variant="primary" size="md">
                RSVP
                View Details
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Card.Body>
  </Card>
);

ConcertBasic.propTypes = {
  concert: PropTypes.shape({
    owner: PropTypes.string,
    image: PropTypes.string,
    instruments: PropTypes.arrayOf(PropTypes.string),
    tastes: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    concertName: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    instrumentsNeeded: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
    concertLocation: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  showDetailsLink: PropTypes.bool,
};

ConcertBasic.defaultProps = {
  showDetailsLink: false,
};

export default ConcertBasic;
