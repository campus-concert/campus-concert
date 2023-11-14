import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../api/profile/Profile';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the AddStuff page for adding a document. */
const CreateUser = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, image, description, contact, location, goals, instruments, tastes } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert(
      { firstName, lastName, image, description, contact, location, goals, instruments, tastes, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'User created successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create User</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" />
                <TextField name="lastName" />
                <TextField name="image" />
                <TextField name="description" />
                <TextField name="contact" />
                <TextField name="location" />
                <TextField name="goals" />
                <SelectField name="instruments" />
                <SelectField name="tastes" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
