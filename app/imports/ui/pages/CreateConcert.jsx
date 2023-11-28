import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, LongTextField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Navigate } from 'react-router-dom';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Concerts.schema);

/* Renders the AddStuff page for adding a document. */
const CreateConcert = () => {

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
    const { concertName, concertDescription, concertContact, date, time, concertLocation, instrumentsNeeded, genres } = data;
    Concerts.collection.insert(
      { concertName, concertDescription, concertContact, date, time, concertLocation, instrumentsNeeded, genres },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Concert created successfully', 'success');
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
            <Col className="text-center"><h2>Create a Concert</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField name="concertName" showInlineError />
                    </Col>
                    <Col>
                      <TextField name="concertContact" placeholder="Please enter a 10-digit phone number including the area code" showInlineError />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <LongTextField name="concertDescription" showInlineError />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField name="date" placeholder="mm/dd/year" showInlineError />
                    </Col>
                    <Col>
                      <TextField name="time" placeholder="hour:min am/pm" showInlineError />
                    </Col>
                    <Col>
                      <TextField name="concertLocation" placeholder="Enter where the concert will be held" showInlineError />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SelectField
                        name="instrumentsNeeded"
                        placeholder="Choose instruments needed for the performance"
                        showInlineError
                      />
                    </Col>
                    <Col>
                      <SelectField
                        name="genres"
                        placeholder="Choose genres"
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

export default CreateConcert;
