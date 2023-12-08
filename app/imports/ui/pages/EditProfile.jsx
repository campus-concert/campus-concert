import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, LongTextField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the AddStuff page for adding a document. */
const EditProfile = () => {

  const [redirectToReferer, setRedirectToRef] = useState(false);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();

  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Profiles.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // On submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, image, description, contact, location, goals, instruments, tastes } = data;
    Profiles.collection.update(
      _id,
      { $set: { firstName, lastName, image, description, contact, location, goals, instruments, tastes } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'User updated successfully', 'success');
          setRedirectToRef(true);
        }
      },
    );
  };

  if (redirectToReferer) {
    return <Navigate to={`/userprofile/admin/${_id}`} />;
  }
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms

  const transform = (label) => ` ${label}`;
  return ready ? (
    <Container id="edit-profile-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card className="p-4 mb-4"> {/* Underlay title with a white box */}
            <Col className="text-center"><h2>Edit Profile</h2></Col>
            { doc ? (
              <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col>
                        <TextField id="edit-profile-first-name" name="firstName" showInlineError />
                      </Col>
                      <Col>
                        <TextField id="edit-profile-last-name" name="lastName" showInlineError />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <TextField id="edit-profile-image" name="image" placeholder="Please insert URL" showInlineError />
                      </Col>
                      <Col>
                        <TextField
                          id="edit-profile-contact"
                          name="contact"
                          showInlineError
                          disabled
                        />
                      </Col>
                    </Row>
                    <LongTextField id="edit-profile-description" name="description" showInlineError />
                    <TextField id="edit-profile-goal" name="goals" showInlineError />
                    <Row>
                      <Col>
                        <SelectField
                          id="edit-profile-location"
                          name="location"
                          placeholder="Choose location"
                          showInlineError
                        />
                      </Col>
                      <Col>
                        Instruments
                        <SelectField
                          id="edit-instruments"
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
                          id="edit-tastes"
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
                    <SubmitField id="edit-profile-submit" value="Submit" />
                    <ErrorsField />
                  </Card.Body>
                </Card>
              </AutoForm>
            ) : (
              <div>You do not have permission to edit this Profile.</div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
