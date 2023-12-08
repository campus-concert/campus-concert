import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, LongTextField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Navigate } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the AddStuff page for adding a document. */
const CreateProfile = () => {

  const [redirectToReferer, setRedirectToRef] = useState(false);

  const { ready } = useTracker(() => {
    // Determine if the subscription is ready
    const rdy = Meteor.user();
    return {
      ready: rdy,
    };
  });
  const isValidUrl = (url) => {
    const urlRegex = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w]*)*\/?$/i;

    const isValidProtocol = urlRegex.test(url);
    const hasValidDomain = ['youtube.com', 'youtu.be', 'spotify.com', 'soundcloud.com'].some(domain => url.includes(domain));
    return isValidProtocol && hasValidDomain && urlRegex.test(url) && (url.toLowerCase().startsWith('http://') || url.toLowerCase().startsWith('https://'));
  };

  const validateUrls = (data) => {
    const { youtubeLink, spotifyLink, soundcloudLink } = data;
    const errors = {};

    if (youtubeLink && !isValidUrl(youtubeLink)) {
      errors.youtubeLink = 'Invalid or unsupported YouTube URL';
    }

    if (spotifyLink && !isValidUrl(spotifyLink)) {
      errors.spotifyLink = 'Invalid or unsupported Spotify URL';
    }

    if (soundcloudLink && !isValidUrl(soundcloudLink)) {
      errors.soundcloudLink = 'Invalid or unsupported SoundCloud URL';
    }

    return errors;
  };
  // On submit, insert the data.
  const submit = (data) => {
    const validationErrors = validateUrls(data);

    if (Object.keys(validationErrors).length > 0) {
      swal('Validation Error', 'Please enter valid URLs with http or https protocols. (e.g. http://youtube.com)', 'error');
      return;
    }
    const {
      firstName,
      lastName,
      image,
      description,
      contact,
      location,
      goals,
      instruments,
      tastes,
      youtubeLink,
      spotifyLink,
      soundcloudLink,
    } = data;
    Profiles.collection.insert(
      { firstName, lastName, image, description, contact, location, goals, instruments, tastes, youtubeLink, spotifyLink, soundcloudLink },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'User created successfully', 'success');
          setRedirectToRef(true);
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;

  if (redirectToReferer) {
    return <Navigate to="/userhome" />;
  }

  const transform = (label) => ` ${label}`;
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card className="p-4 mb-4"> {/* Underlay title with a white box */}
            <Col className="text-center"><h2>Create Profile</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField name="firstName" showInlineError />
                    </Col>
                    <Col>
                      <TextField name="lastName" showInlineError />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField name="image" placeholder="Please insert URL" showInlineError />
                    </Col>
                    <Col>
                      <TextField
                        id="profile-contact"
                        name="contact"
                        value={Meteor.user().username}
                        showInlineError
                        disabled // for now, until there will be an owner field
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Instruments
                      <SelectField
                        id="instruments"
                        name="instruments"
                        multiple
                        checkboxes
                        transform={transform}
                        showInlineError
                        style={{
                          maxHeight: '120px',
                          overflowY: 'scroll',
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          padding: '8px',
                        }}
                      />
                    </Col>
                    <Col>
                      Tastes
                      <SelectField
                        id="tastes"
                        name="tastes"
                        multiple
                        checkboxes
                        transform={transform}
                        showInlineError
                        style={{
                          maxHeight: '120px',
                          overflowY: 'scroll',
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          padding: '8px',
                        }}
                      />
                    </Col>
                  </Row>
                  <TextField id="profile-goal" name="goals" showInlineError />
                  <Row>
                    <Col>
                      <SelectField
                        id="profile-location"
                        name="location"
                        placeholder="Choose location"
                        showInlineError
                      />
                    </Col>
                  </Row>
                  <LongTextField id="profile-description" name="description" showInlineError />
                  <Row>
                    <Col>
                      <TextField
                        id="profile-youtubeLink"
                        name="youtubeLink"
                        placeholder="Enter Youtube link (optional)"
                        showInlineError
                      />
                    </Col>
                    <Col>
                      <TextField
                        id="profile-spotifyLink"
                        name="spotifyLink"
                        placeholder="Enter Spotify link (optional)"
                        showInlineError
                      />
                    </Col>
                    <Col>
                      <TextField
                        id="profile-soundcloudLink"
                        name="soundcloudLink"
                        placeholder="Enter Soundcloud link (optional)"
                        showInlineError
                      />
                    </Col>
                  </Row>
                  <SubmitField id="profile-submit" value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default CreateProfile;
