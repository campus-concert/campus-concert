import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Calendar, Clock, GeoAlt } from 'react-bootstrap-icons';
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

const ConcertBasic = ({ concert }) => {
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

  return ready ? (
    <Link to={`/userconcert/${concert._id}`} className="card-link" style={{ textDecoration: 'none' }}>
      <Card className="d-flex flex-column h-100">
        <Card.Header className="bg-white position-relative">
          <div>
            <Card.Title className="d-flex mt-2" style={{ fontSize: '1.5rem' }}>{concert.concertName}</Card.Title>
          </div>
          <Card.Text className="mb-2" style={{ fontSize: '0.7rem' }}>
            Posted by {author} • {timeDifference(new Date(), concert.createdAt)}
          </Card.Text>
          <div className="mb-2">
            {concert.genres && concert.genres.length > 0 && (
              <div>
                {concert.genres.slice(0, 3).map((genre, index) => (
                  <span key={index} className="badge bg-secondary mx-1">{genre}</span>
                ))}
                {concert.genres.length > 3 && <span className="badge bg-secondary mx-1">...</span>}
                <hr style={{ margin: '10px 0' }} />
                <p style={{ fontSize: '0.8rem', color: '#777', display: 'inline' }}>Looking for: </p>
                {concert.instrumentsNeeded && concert.instrumentsNeeded.length > 0 && (
                  <div style={{ display: 'inline' }}>
                    {concert.instrumentsNeeded.slice(0, 2).map((instrument, index) => (
                      <span key={index} className="badge bg-secondary mx-1">{instrument}</span>
                    ))}
                    {concert.instrumentsNeeded.length > 2 && <span className="badge bg-secondary mx-1">...</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        </Card.Header>
        <Card.Body className="flex-grow-1" style={{ maxHeight: '175px', overflow: 'hidden' }}>
          <div className="d-flex flex-column">
            <div className="mb-2">
              <Card.Text>
                <h6>
                  <Calendar className="mr-2" />{' '}
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
                  <Clock />  {concert.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
                </h6>
              </Card.Text>
            </div>
            <div className="mb-2">
              <Card.Text><h6><GeoAlt />  {concert.concertLocation}</h6></Card.Text>
            </div>
          </div>
        </Card.Body>
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
  }).isRequired,
};

export default ConcertBasic;
