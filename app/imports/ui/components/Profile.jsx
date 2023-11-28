import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'react-bootstrap';
import { Youtube, Spotify, Cloud } from 'react-bootstrap-icons';

const Profile = ({ profile, edit = false }) => {

  if (!profile) {
    return <div>No Profile found</div>;
  }

  return (
    <Card id="user-profile-card" className="d-flex flex-column">
      <Card.Header className="bg-dark text-white text-center position-relative">
        <Image src={profile.image} roundedCircle width={200} className="mt-3" />
        <div className="d-flex justify-content-end p-3 w-100 position-absolute top-0 end-0">
          <a
            href={profile.youtubeLink || '#'} // Use the actual YouTube link from the profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-white me-3"
          >
            <Youtube size={25} />
          </a>
          <a
            href={profile.spotifyLink || '#'} // Use the actual Spotify link from the profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-white me-3"
          >
            <Spotify size={25} />
          </a>
          <a
            href={profile.soundcloudLink || '#'} // Use the actual SoundCloud link from the profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <Cloud size={25} />
          </a>
        </div>
        <Card.Title id="profile-name" className="my-2">{profile.firstName} {profile.lastName}</Card.Title>
      </Card.Header>
      <Card.Body className="flex-grow-1">
        <div className="d-flex flex-column">
          <div className="mb-2">
            <Card.Text id="profile-instruments"><h5>Instruments:</h5>{profile.instruments.join(', ')}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text id="profile-tastes"><h5>Musical Tastes:</h5>{profile.tastes.join(', ')}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text id="profile-location"><h5>Location:</h5>{profile.location}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text id="profile-goal"><h5>Goals:</h5>{profile.goals}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text><h5>Contact:</h5>{profile.contact}</Card.Text>
          </div>
          <Card.Text id="profile-description" className="my-2"><h5>Description:</h5>{profile.description}</Card.Text>
        </div>
      </Card.Body>
      <Card.Footer>
        {edit ? (

          <Link id="edit-profile-button" to={`/edit/${profile._id}`}>Edit</Link>
        ) : (
          <Link to={`/message/${profile._id}`}>
            <Button variant="primary" size="md" className="mt-3">
              Message
            </Button>
          </Link>
        )}
      </Card.Footer>
    </Card>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    contact: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    goals: PropTypes.string,
    location: PropTypes.string,
    instruments: PropTypes.arrayOf(PropTypes.string),
    tastes: PropTypes.arrayOf(PropTypes.string),
    youtubeLink: PropTypes.string,
    spotifyLink: PropTypes.string,
    soundcloudLink: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  edit: PropTypes.bool.isRequired,
};

export default Profile;
