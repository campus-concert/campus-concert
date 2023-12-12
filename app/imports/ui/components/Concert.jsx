import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Star, StarFill } from 'react-bootstrap-icons';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from './LoadingSpinner';

const timeDifference = (current, target) => {
  const msPerSecond = 1000;
  const msPerMinute = 60 * msPerSecond;
  const msPerHour = 60 * msPerMinute;
  const msPerDay = 24 * msPerHour;
  const msPerWeek = 7 * msPerDay;
  const msPerMonth = 30 * msPerDay;
  const msPerYear = 365 * msPerDay;

  const difference = target - current;
  const isFuture = difference > 0;

  const elapsed = Math.abs(difference);

  if (elapsed < msPerMinute) {
    const seconds = Math.round(elapsed / msPerSecond);
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ${isFuture ? 'away' : 'ago'}`;
  } if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ${isFuture ? 'away' : 'ago'}`;
  } if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${isFuture ? 'away' : 'ago'}`;
  } if (elapsed < msPerWeek) {
    const days = Math.round(elapsed / msPerDay);
    return `${days} ${days === 1 ? 'day' : 'days'} ${isFuture ? 'away' : 'ago'}`;
  } if (elapsed < msPerMonth) {
    const weeks = Math.round(elapsed / msPerWeek);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ${isFuture ? 'away' : 'ago'}`;
  } if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    return `${months} ${months === 1 ? 'month' : 'months'} ${isFuture ? 'away' : 'ago'}`;
  }

  const years = Math.round(elapsed / msPerYear);
  return `${years} ${years === 1 ? 'year' : 'years'} ${isFuture ? 'away' : 'ago'}`;
};

const Concert = ({ concert }) => {
  const toggleBookmark = () => {
    const newBookmarkState = !concert.bookmarks || !concert.bookmarks.some(e => e.userId === Meteor.userId() && e.state);
    Meteor.call('bookmarkConcert', concert._id, newBookmarkState, (error) => {
      if (error) {
        console.error(error);
      }
    });
  };
  const currentDate = new Date();
  const concertDate = new Date(concert.date.getTime() + 10 * 60 * 60 * 1000);

  if (!concert) {
    return <div>No Concert found</div>;
  }

  const { admin } = useParams();

  const { owner: profileEmail } = concert;
  // eslint-disable-next-line prefer-const
  let { ready, userProfile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userProf = Profiles.collection.findOne({ contact: profileEmail });
    return {
      userProfile: userProf,
      ready: rdy,
    };
  });

  const author = userProfile ? (
    <span>
      {Meteor.user() && Meteor.user().emails[0].address === concert.owner ? (
        <Link to="/userprofile/" className="profile-link">
          {`${userProfile.firstName} ${userProfile.lastName}`}
        </Link>
      ) : (
        <Link to={`/userprofile/${userProfile._id}`} className="profile-link">
          {`${userProfile.firstName} ${userProfile.lastName}`}
        </Link>
      )}
    </span>
  ) : 'User Concert';

  return ready ? (
    <Card className="d-flex flex-column h-100 style={{ border: '1.5px solid #ccc' }}">
      <Card.Header className="text-center position-relative">
        <Card.Title id="concert-name" className="mt-2" style={{ fontSize: '1.5rem' }}>{concert.concertName}</Card.Title>
        <span className="time-difference-wrapper">
          <span className="time-difference" style={{ fontSize: '0.9rem' }}>
            Posted by {author} •
          </span>{' '}
          <OverlayTrigger
            placement="bottom"
            overlay={(
              <Tooltip id={`tooltip-${concert._id}`} className="custom-tooltip">
                {concert.createdAt.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}, {concert.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Tooltip>
            )}
          >
            <span className="time-difference" style={{ fontSize: '0.9rem' }}>
              {timeDifference(new Date(), concert.createdAt)}
            </span>
          </OverlayTrigger>
        </span>
        <Button
          variant={concert.bookmarks && concert.bookmarks.some(e => e.userId === Meteor.userId() && e.state) ? 'success' : 'outline-secondary'}
          size="sm"
          className="position-absolute top-0 end-0 m-2"
          onClick={(e) => {
            toggleBookmark();
            e.preventDefault(); // dont take the redirection link
          }}
        >
          {concert.bookmarks ? <StarFill /> : <Star />}
        </Button>
      </Card.Header>
      <Card.Body className="flex-grow-1">
        <div className="d-flex flex-column">
          <div className="mb-2">
            <Card.Text>
              <h5>Musical Genres:</h5>
              {concert.genres && concert.genres.length > 0 && (
                <div>
                  {concert.genres.map((genre, index) => (
                    <span key={index} className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '14px' }}>{genre}</span>
                  ))}
                </div>
              )}
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text>
              <h5>Instruments Needed:</h5>
              {concert.instrumentsNeeded && concert.instrumentsNeeded.length > 0 && (
                <div>
                  {concert.instrumentsNeeded.map((instrumentsNeeded, index) => (
                    <span key={index} className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '14px' }}>{instrumentsNeeded}</span>
                  ))}
                </div>
              )}
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text>
              <h5>Date:</h5>
              <span>
                {concert.date.toLocaleDateString('en-US', {
                  timeZone: 'UTC',
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }).replace(',', '')}
              </span>{' '}
              <span style={{ fontSize: '0.8rem', color: concertDate < currentDate ? 'coral' : '#999' }}>
                ({timeDifference(currentDate, concertDate)})
              </span>
            </Card.Text>
          </div>
          <div className="mb-2">
            <Card.Text>
              <h5>Time:</h5>
              {concert.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
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
      </Card.Body>
      { (Meteor.user() && (admin || Meteor.user().emails[0].address === concert.owner)) && (
        <Card.Footer>
          <Link id="edit-concert-button" to={`/edit-concert/${concert._id}`}>Edit or Remove</Link>
        </Card.Footer>
      )}
    </Card>
  ) : (
    <LoadingSpinner />
  );
};

Concert.propTypes = {
  concert: PropTypes.shape({
    concertName: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    createdAt: PropTypes.instanceOf(Date),
    status: PropTypes.string,
    instrumentsNeeded: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
    concertLocation: PropTypes.string,
    concertDescription: PropTypes.string,
    contact: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
    bookmarks: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        state: PropTypes.bool,
      }),
    ),
  }).isRequired,
};

export default Concert;
