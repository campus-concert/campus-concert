// ProfileBasic.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileBasic = ({ profile, showDetailsLink }) => (
  <Card className="d-flex flex-column h-100">
    <Card.Header className="bg-dark text-white text-center position-relative">
      <Image src={profile.image} roundedCircle width={200} className="mt-3" />
      <Card.Title className="my-2">{profile.firstName} {profile.lastName}</Card.Title>
    </Card.Header>
    <Card.Body className="flex-grow-1">
      <div className="d-flex flex-column">
        <div className="mb-2">
          <Card.Text><h5>Instruments:</h5>{profile.instruments.join(', ')}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Musical Tastes:</h5>{profile.tastes.join(', ')}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Goals:</h5>{profile.goals}</Card.Text>
        </div>
        <div className="mb-2">
          <Card.Text><h5>Location:</h5>{profile.location}</Card.Text>
        </div>
        {showDetailsLink && (
          <div className="d-flex justify-content-center">
            <Link to={`/userprofile/${profile._id}`}>
              <Button variant="primary" size="md">
                View Details
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Card.Body>
  </Card>
);

ProfileBasic.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    instruments: PropTypes.arrayOf(PropTypes.string),
    tastes: PropTypes.arrayOf(PropTypes.string),
    goals: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  showDetailsLink: PropTypes.bool,
};

ProfileBasic.defaultProps = {
  showDetailsLink: false,
};

export default ProfileBasic;
