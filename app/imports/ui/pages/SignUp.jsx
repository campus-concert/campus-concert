import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import CreateProfile from './CreateProfile';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  // const [redirectToReferer, setRedirectToRef] = useState(false);
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  // if correct authentication, redirect to userhome:
  if (redirectToReferer) {
    return <CreateProfile />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Card className="p-4 mb-4"> {/* Merged components into one white box */}
            <Col className="text-center">
              <h2>Register your account</h2>
            </Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </AutoForm>
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p> {/* Horizontal line with "OR" */}
            </div>
            <Alert variant="light">
              Already have an account? Login
              {' '}
              <Link to="/signin">here</Link>
            </Alert>
            {error === '' ? (
              ''
            ) : (
              <Alert variant="danger">
                <Alert.Heading>Registration was not successful</Alert.Heading>
                {error}
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
