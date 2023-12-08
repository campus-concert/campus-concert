import React, { useRef, useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GeoAltFill } from 'react-bootstrap-icons';

const ProfileBasic = ({ profile, admin }) => {
  let toPath;

  if (admin) {
    toPath = `/userprofile/admin/${profile._id}`;
  } else if (Meteor.user() && Meteor.user().emails[0].address === profile.contact) {
    toPath = '/userprofile';
  } else {
    toPath = `/userprofile/${profile._id}`;
  }
  const tastesRef = useRef(null);
  const instrumentsRef = useRef(null);
  const [tastesOverflowIndex, setTastesOverflowIndex] = useState(-1);
  const [instrumentsOverflowIndex, setInstrumentsOverflowIndex] = useState(-1);

  useEffect(() => {
    const tastesDiv = tastesRef.current;
    const instrumentsDiv = instrumentsRef.current;

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

    if (tastesDiv) {
      setTastesOverflowIndex(calculateOverflowIndex(tastesDiv, profile.tastes));
    }

    if (instrumentsDiv) {
      setInstrumentsOverflowIndex(calculateOverflowIndex(instrumentsDiv, profile.instruments));
    }
  }, [profile.tastes, profile.instruments]);

  return (
    <Link id={admin ? 'admin-view-details' : 'view-details'} to={toPath} className="card-link" style={{ textDecoration: 'none' }}>
      <Card className="d-flex flex-column h-100 style={{ border: '1.5px solid #ccc', display: 'flex' }}">
        <Card.Header className="text-center position-relative">
          <Image src={profile.image} roundedCircle width={200} className="mt-3" />
          <Card.Title className="my-2" style={{ fontSize: '1.6rem' }}>{profile.firstName} {profile.lastName}</Card.Title>
          <div className="mb-2">
            <Card.Text>
              <h6>
                <span style={{ fontSize: '0.9em', paddingRight: '0.25em' }}>
                  <GeoAltFill />
                </span>
                {profile.location}
              </h6>
            </Card.Text>
          </div>
          <div>
            <Card.Text>
              <h6>
                {profile.goals}
              </h6>
            </Card.Text>
          </div>
        </Card.Header>
        <Card.Body className="flex-grow-1" style={{ overflow: 'hidden' }}>
          <div className="d-flex flex-column">
            <div className="mb-2" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }} ref={tastesRef}>
              <h6 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Music Tastes</h6>
              {profile.tastes && profile.tastes.length > 0 && (
                <div style={{ display: 'inline', marginBottom: '-8px' }}>
                  {profile.tastes.slice(0, tastesOverflowIndex === -1 ? profile.tastes.length : tastesOverflowIndex - 1).map((taste, index) => (
                    <span key={index} className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '16px' }}>{taste}</span>
                  ))}
                  {tastesOverflowIndex !== -1 && (
                    <span className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '14px' }}>...</span>
                  )}
                </div>
              )}
            </div>
            <div className="mb-2" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }} ref={instrumentsRef}>
              <h6 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Instruments</h6>
              {profile.instruments && profile.instruments.length > 0 && (
                <div style={{ display: 'inline', marginBottom: '-8px' }}>
                  {profile.instruments.slice(0, instrumentsOverflowIndex === -1 ? profile.instruments.length : instrumentsOverflowIndex - 1).map((instrument, index) => (
                    <span key={index} className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '16px' }}>{instrument}</span>
                  ))}
                  {instrumentsOverflowIndex !== -1 && (
                    <span className="badge bg-secondary-subtle text-dark mx-1 my-1 fw-medium" style={{ fontSize: '14px' }}>...</span>
                  )}
                </div>
              )}
            </div>
            <hr style={{ margin: '5px 0' }} />
            <div className="mt-2 mb-2">
              <Card.Text>
                <h7>
                  {profile.description}
                </h7>
              </Card.Text>
            </div>
          </div>
        </Card.Body>
        { (Meteor.user() && (admin || Meteor.user().emails[0].address === profile.contact)) && (
          <div className="text-center" style={{ marginTop: 'auto', marginBottom: '10px' }}>
            <Link id="edit-profile-button" to={`/edit/${profile._id}`} className="btn btn-outline-primary btn-sm">
              Edit
            </Link>
          </div>
        )}
      </Card>
    </Link>
  );
};

ProfileBasic.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    contact: PropTypes.string,
    instruments: PropTypes.arrayOf(PropTypes.string),
    tastes: PropTypes.arrayOf(PropTypes.string),
    goals: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  admin: PropTypes.bool,
};

ProfileBasic.defaultProps = {
  admin: false,
};

export default ProfileBasic;
