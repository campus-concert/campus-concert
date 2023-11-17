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
    <Container id="signup-page" className="py-5">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Card className="mb-4 p-4">
            <Col className="text-center">
              <h2>New user login</h2>
            </Col>
            <hr className="my-2" />
            <Card.Body>
              <h2>Create a new account</h2>
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <Card>
                  <Card.Body>
                    <TextField name="email" placeholder="E-mail address" />
                    <TextField name="password" placeholder="Password" type="password" />
                    <ErrorsField />
                    <SubmitField />
                  </Card.Body>
                </Card>
              </AutoForm>
              <div className="divider d-flex align-items-center my-2">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <Alert variant="light" className="mb-0">
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
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="p-4 mb-4">
            <h1 className="my-3 display-5 fw-bold ls-tight">
              Elevate your musical journey <br />
              <span>with Campus Concert</span>
            </h1>
            <p className="mb-4 opacity-70">
              Step into the Campus Concert community, where
              musicians in UH Manoa unite to amplify creativity. Whether you`&apos;`re a seasoned player or a fresh face, this is your space to compose, connect, and captivate. J
              oin us in fostering a harmonious environment where every artist`&apos;`s voice adds a unique note to our collective composition. Dive into the rhythm of collabor
              ation at Campus Concert – where individual expressions blend to create a vibrant musical tapestry.
            </p>
            <footer className="blockquote-footer">The <cite title="Source Title">Campus Concert</cite> team</footer>
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
