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
  // On submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, image, description, contact, location, goals, instruments, tastes } = data;
    Profiles.collection.insert(
      { firstName, lastName, image, description, contact, location, goals, instruments, tastes },
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

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card className="p-4 mb-4"> {/* Underlay title with a white box */}
            <Col className="text-center"><h2>Create User</h2></Col>
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
                        name="contact"
                        value={Meteor.user().username}
                        showInlineError
                      />
                    </Col>
                  </Row>
                  <LongTextField name="description" showInlineError />
                  <TextField name="goals" showInlineError />
                  <Row>
                    <Col>
                      <SelectField
                        name="location"
                        placeholder="Choose location"
                        showInlineError
                      />
                    </Col>
                    <Col>
                      <SelectField
                        name="instruments"
                        placeholder="Choose instrument"
                        showInlineError
                      />
                    </Col>
                    <Col>
                      <SelectField
                        name="tastes"
                        placeholder="Choose taste"
                        showInlineError
                      />
                    </Col>
                  </Row>
                  <SubmitField value="Submit" />
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
