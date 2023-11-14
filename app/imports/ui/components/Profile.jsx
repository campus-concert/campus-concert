import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import { Youtube, Spotify, Cloud } from 'react-bootstrap-icons';

/** Renders a single row in the List Contacts table. See pages/ListContacts.jsx. */
const Profile = ({ profile }) => (
  <Card className="d-flex flex-column">
    <Card.Header className="bg-dark text-white text-center position-relative">
      <Image src={profile.image} roundedCircle width={200} className="mt-3" />
      <div className="d-flex justify-content-end p-3 w-100 position-absolute top-0 end-0">
        <a
          href="http://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <Youtube size={25} />
        </a>
        <a
          href="http://spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <Spotify size={25} />
        </a>
        <a
          href="http://soundcloud.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          <Cloud size={25} />
        </a>
      </div>

      <Card.Title className="my-2">{profile.firstName} {profile.lastName}</Card.Title>
    </Card.Header>
    <Card.Body className="flex-grow-1">
      <div className="d-flex flex-column">
        <div className="mb-2">
          <Card.Text><h5>Instruments:</h5>{profile.instruments}</Card.Text>
        </div>

        <div className="mb-2">
          <Card.Text><h5>Musical Tastes:</h5>{profile.tastes}</Card.Text>
        </div>

        <div className="mb-2">
          <Card.Text><h5>Goals:</h5>{profile.goals}</Card.Text>
        </div>

        <div className="mb-2">
          <Card.Text><h5>Location:</h5>{profile.location}</Card.Text>
        </div>

        <div className="mb-2">
          <Card.Text><h5>Contact:</h5>{profile.contact}</Card.Text>
        </div>

        <Card.Text className="my-2"><h5>Description:</h5>{profile.description}</Card.Text>

        <Link className="mt-3" to={`/message/${profile._id}`}>Message</Link>
      </div>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    contact: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    goals: PropTypes.string,
    location: PropTypes.string,
    instruments: PropTypes.string,
    tastes: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Profile;
