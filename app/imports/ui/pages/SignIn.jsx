import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/userhome" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id="signin-page" className="py-5">
      <Row className="justify-content-evenly">
        <Col xs={5}>
          <Card className="mb-4 p-4">
            <Col className="text-center">
              <h2>Member login</h2>
            </Col>
            <hr className="my-2" /> {/* Decreased vertical margin */}
            <Card.Body>
              <h2>Login to your account</h2>
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <Card>
                  <Card.Body>
                    <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                    <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
                    <ErrorsField />
                    <SubmitField id="signin-form-submit" />
                  </Card.Body>
                </Card>
              </AutoForm>
              <div className="divider d-flex align-items-center my-2"> {/* Decreased vertical margin */}
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <Alert variant="light" className="mb-0">
                <p className="p-0 m-0">Not a member? <Link to="/signup">Register</Link></p>
              </Alert>
              {error === '' ? (
                ''
              ) : (
                <Alert variant="danger" className="mt-2"> {/* Increased top margin */}
                  <Alert.Heading>Login was not successful</Alert.Heading>
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="p-4 mb-4">
            <h1 className="my-3 display-5 fw-bold ls-tight">
              Welcome back<br />
              <span />
            </h1>
            <p className="mb-4 opacity-70">
              Welcome back, maestro! We were worried you got lost in a sea of sheet music or perhaps tangled up in guitar strings.
              It´s been so long that even our metronome missed a beat. Your return is like finding the perfect harmony in a chaotic cacophony.
              Dust off your instruments, grab a cup of coffee (or a melodious beverage of your choice), and let´s get back to the groove together.
              The stage is set, the spotlight is on you, and our community of musicians is eagerly waiting for your encore performance. Let the reunion tour begin!
            </p>
            <footer className="blockquote-footer">The <cite title="Source Title">Campus Concert</cite> team</footer>
          </Card>
          <Col className="text-center">
            <Card className="mb-4">
              <Card.Body>
                <h2>Member login</h2>
              </Card.Body>
            </Card>
          </Col>
          <AutoForm className="shadow p-3 mb-5 bg-white rounded" schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id="signin-form-submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>
          <Alert variant="light">
            <p className="p-0 m-0">Not a member? <Link to="/signup">Register</Link></p>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
        <Col>
          <h1 className="my-5 display-5 fw-bold ls-tight">
            Welcome back<br />
            <span />
          </h1>
          <p className="mb-4 opacity-70v">
            Welcome back, maestro! We were worried you got lost in a sea of sheet music or perhaps tangled up in guitar strings.
            It´s been so long that even our metronome missed a beat. Your return is like finding the perfect harmony in a chaotic cacophony.
            Dust off your instruments, grab a cup of coffee (or a melodious beverage of your choice), and let´s get back to the groove together.
            The stage is set, the spotlight is on you, and our community of musicians is eagerly waiting for your encore performance. Let the reunion tour begin!
          </p>
          <footer className="blockquote-footer">The <cite title="Source Title">Campus Concert</cite> team</footer>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
