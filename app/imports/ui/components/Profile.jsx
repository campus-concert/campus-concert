import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Badge, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Youtube, Spotify, CloudFog2Fill } from 'react-bootstrap-icons';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from './LoadingSpinner';

const Profile = ({ profile, edit = false }) => {
  const { contact: concertEmail } = profile;

  const { ready, userConcerts } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.userPublicationName);
    const rdy = subscription.ready();

    // Only fetch concerts owned by the logged-in user
    const userConcertItems = Concerts.collection.find({ owner: concertEmail }).fetch();
    return {
      userConcerts: userConcertItems,
      ready: rdy,
    };
  });

  if (!profile) {
    return <div>No Profile found</div>;
  }

  const getRandomColor = () => {
    const badgeColors = ['primary', 'primary-subtle', 'success', 'success-subtle', 'secondary', 'secondary-subtle',
      'danger', 'danger-subtle', 'warning', 'warning-subtle', 'info', 'info-subtle', 'light', 'dark', 'dark-subtle'];

    const randomIndex = Math.floor(Math.random() * badgeColors.length);
    return `bg-${badgeColors[randomIndex]}`;
  };

  return ready ? (
    <Card id="user-profile-card" className="d-flex flex-column">
      <Card.Header className="text-center position-relative">
        <Image src={profile.image} roundedCircle width={200} className="mt-3" />
        <Card.Title id="profile-name" className="my-2" style={{ fontSize: '1.6rem' }}>{profile.firstName} {profile.lastName}</Card.Title>
        <div className="d-flex justify-content-end p-3 w-100 position-absolute top-0 end-0">
          {profile.youtubeLink && (
            <a
              href={profile.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
              style={{ color: '#FF0000', order: 1 }}
            >
              <Youtube size={25} />
            </a>
          )}
          {profile.spotifyLink && (
            <a
              href={profile.spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
              style={{ color: '#1ED760', order: 2 }}
            >
              <Spotify size={25} />
            </a>
          )}
          {profile.soundcloudLink && (
            <a
              href={profile.soundcloudLink}
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
              style={{ color: '#ff7700', order: 3 }}
            >
              <CloudFog2Fill size={25} />
            </a>
          )}
        </div>
      </Card.Header>
      <Card.Body className="flex-grow-1">
        <div className="d-flex flex-column">
          <div className="mb-2">
            <Card.Text id="profile-tastes">
              <h5>Musical Tastes:</h5>
              {profile.tastes && profile.tastes.length > 0 && (
                <div>
                  {profile.tastes.map((taste, index) => (
                    <span key={index} className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '14px' }}>{taste}</span>
                  ))}
                </div>
              )}
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text id="profile-instruments">
              <h5>Instruments:</h5>
              {profile.instruments && profile.instruments.length > 0 && (
                <div>
                  {profile.instruments.map((instruments, index) => (
                    <span key={index} className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '14px' }}>{instruments}</span>
                  ))}
                </div>
              )}
            </Card.Text>
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
      <Card.Footer className="bg-white">
        <div className="mb-2">
          <Card.Text id="profile-concerts">
            <h5>Concerts Posted:</h5>
            {userConcerts && userConcerts.length > 0 ? (
              <div>
                {userConcerts.map((concert) => {
                  const badgeColor = getRandomColor();
                  const isSubtleOrWarning = badgeColor.includes('subtle') || badgeColor.includes('warning');
                  const textColorClass = isSubtleOrWarning ? 'text-dark' : 'text-white';

                  return (
                    <div key={concert._id} className="mb-2">
                      <Badge className={`${badgeColor}`}>
                        <Link
                          to={`/userconcert/${concert._id}`}
                          className={`mx-1 my-1 fw-medium ${textColorClass}`}
                          style={{ fontSize: '14px', textDecoration: 'none' }}
                        >
                          {concert.concertName}
                        </Link>
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: '#999' }}>No concerts posted.</p>
            )}
          </Card.Text>
        </div>
      </Card.Footer>
      <Card.Footer>
        {Meteor.user() && (edit || Meteor.user().emails[0].address === profile.contact) ? (
          <Link id="edit-profile-button" to={`/edit/${profile._id}`}>Edit</Link>
        ) : ('')}
      </Card.Footer>
    </Card>
  ) : <LoadingSpinner />;
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
