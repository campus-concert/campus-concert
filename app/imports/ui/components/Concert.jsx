import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'react-bootstrap';
import { Youtube, Spotify, Cloud } from 'react-bootstrap-icons';

const Concert = ({ profile, own = false }) => {

  if (!profile) {
    return <div>No Concert found</div>;
  }

  return own ? (
    <Card className="d-flex flex-column">
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
        <Card.Title className="my-2">{profile.owner}</Card.Title>
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
            <Card.Text><h5>Location:</h5>{profile.location}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text><h5>Date:</h5>{profile.date}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text><h5>Time:</h5>{profile.time}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text><h5>Contact:</h5>{profile.contact}</Card.Text>
          </div>
          <Card.Text className="my-2"><h5>Description:</h5>{profile.description}</Card.Text>
        </div>
      </Card.Body>
      <Card.Footer>
        <Link to={`/edit/${profile._id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  ) : (
    <Card className="d-flex flex-column">
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
        <Card.Title className="my-2">{profile.owner}</Card.Title>
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
            <Card.Text><h5>Location:</h5>{profile.location}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text><h5>Date:</h5>{profile.date}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text><h5>Time:</h5>{profile.time}</Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text><h5>Contact:</h5>{profile.contact}</Card.Text>
          </div>
          <Card.Text className="my-2"><h5>Description:</h5>{profile.description}</Card.Text>
        </div>
        <Link to={`/message/${profile._id}`}>
          <Button variant="primary" size="md" className="mt-3">
            Message
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

Concert.propTypes = {
  profile: PropTypes.shape({
    owner: PropTypes.string,
    contact: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    instruments: PropTypes.arrayOf(PropTypes.string),
    tastes: PropTypes.arrayOf(PropTypes.string),
    youtubeLink: PropTypes.string,
    spotifyLink: PropTypes.string,
    soundcloudLink: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  own: PropTypes.bool.isRequired,
};

export default Concert;
