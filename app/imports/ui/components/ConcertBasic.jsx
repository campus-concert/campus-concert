import React, { useRef, useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Calendar, Clock, GeoAlt, StarFill, Star } from 'react-bootstrap-icons';
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

const ConcertBasic = ({ concert, admin }) => {
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

  const genresRef = useRef(null);
  const instrumentsNeededRef = useRef(null);
  const [genresOverflowIndex, setGenresOverflowIndex] = useState(-1);
  const [instrumentsNeededOverflowIndex, setInstrumentsNeededOverflowIndex] = useState(-1);

  useEffect(() => {
    const genresDiv = genresRef.current;
    const instrumentsNeededDiv = instrumentsNeededRef.current;
    const calculateOverflowIndex = (container) => {
      const elements = container.querySelectorAll('.badge');
      let totalWidth = 0;
      let currentOverflowIndex = -1;

      elements.forEach((element, index) => {
        totalWidth += element.offsetWidth;

        if (totalWidth > container.clientWidth && currentOverflowIndex === -1) {
          currentOverflowIndex = index;
        }
      });

      return currentOverflowIndex;
    };

    if (genresDiv) {
      setGenresOverflowIndex(calculateOverflowIndex(genresDiv, concert.genres));
    }

    if (instrumentsNeededDiv) {
      setInstrumentsNeededOverflowIndex(calculateOverflowIndex(instrumentsNeededDiv, concert.instrumentsNeeded));
    }
  }, [concert.genres, concert.instrumentsNeeded]);

  return ready ? (
    <Link to={admin ? `/userconcert/admin/${concert._id}` : `/userconcert/${concert._id}`} className="card-link" style={{ textDecoration: 'none' }}>
      <Card className="d-flex flex-column h-100" style={{ border: '1.5px solid #ccc', display: 'flex' }}>
        <Card.Header className="bg-white position-relative">
          <div>
            <Card.Title className="d-flex mt-2 concert-title" style={{ fontSize: '1.5rem', overflow: 'hidden' }}>{concert.concertName}</Card.Title>
          </div>
          <Card.Text className="mb-2" style={{ fontSize: '0.7rem' }}>
            Posted by {author} • {timeDifference(new Date(), concert.createdAt)}
          </Card.Text>
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
        <Card.Body className="flex-grow-1" style={{ overflow: 'hidden' }}>
          <div className="mb-2" style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '5px', marginTop: '-6px' }} ref={genresRef}>
            <h6 style={{ fontSize: '1rem', marginBottom: '5px' }}>Genres</h6>
            {concert.genres && concert.genres.length > 0 && (
              <div style={{ display: 'inline', marginBottom: '-8px' }}>
                {concert.genres.slice(0, genresOverflowIndex === -1 ? concert.genres.length : genresOverflowIndex - 1).map((genre, index) => (
                  <span key={index} className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '14px' }}>{genre}</span>
                ))}
                {genresOverflowIndex !== -1 && (
                  <span className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '12px' }}>...</span>
                )}
              </div>
            )}
          </div>
          <div className="mb-2" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }} ref={instrumentsNeededRef}>
            <h6 style={{ fontSize: '1rem', marginBottom: '5px' }}>Instruments Needed</h6>
            {concert.instrumentsNeeded && concert.instrumentsNeeded.length > 0 && (
              <div style={{ display: 'inline', marginBottom: '-8px' }}>
                {concert.instrumentsNeeded.slice(0, instrumentsNeededOverflowIndex === -1 ? concert.instrumentsNeeded.length : instrumentsNeededOverflowIndex - 1).map((instrument, index) => (
                  <span key={index} className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '14px' }}>{instrument}</span>
                ))}
                {instrumentsNeededOverflowIndex !== -1 && (
                  <span className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '12px' }}>...</span>
                )}
              </div>
            )}
          </div>
          <hr style={{ margin: '5px 0' }} />
          <div className="d-flex flex-column">
            <div className="mt-2 mb-2">
              <Card.Text>
                <h6>
                  <span style={{ fontSize: '1em', paddingRight: '0.25em' }}>
                    <Calendar />
                  </span>{' '}
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
                </h6>
              </Card.Text>
            </div>
            <div className="mb-2">
              <Card.Text>
                <h6>
                  <span style={{ fontSize: '1em', paddingRight: '0.25em' }}>
                    <Clock />
                  </span>{' '}
                  {concert.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
                </h6>
              </Card.Text>
            </div>
            <div>
              <Card.Text>
                <h6>
                  <span style={{ fontSize: '1em', paddingRight: '0.25em' }}>
                    <GeoAlt />
                  </span>{' '}
                  {concert.concertLocation}
                </h6>
              </Card.Text>
            </div>
          </div>
        </Card.Body>
        { (Meteor.user() && (admin || Meteor.user().emails[0].address === concert.owner)) && (
          <div className="text-center" style={{ marginTop: 'auto', marginBottom: '10px' }}>
            <Link id="edit-concert-button" to={`/edit-concert/${concert._id}`} className="btn btn-outline-primary btn-sm">
              Edit or Remove
            </Link>
          </div>
        )}
      </Card>
    </Link>
  ) : (
    <LoadingSpinner />
  );
};

ConcertBasic.propTypes = {
  concert: PropTypes.shape({
    concertName: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    createdAt: PropTypes.instanceOf(Date),
    instrumentsNeeded: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
    concertLocation: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
    bookmarks: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        state: PropTypes.bool,
      }),
    ),
  }).isRequired,
  admin: PropTypes.bool,
};

ConcertBasic.defaultProps = {
  admin: false,
};

export default ConcertBasic;
