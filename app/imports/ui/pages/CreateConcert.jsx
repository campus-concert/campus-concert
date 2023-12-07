import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, LongTextField, HiddenField, TextField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Navigate } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Concerts.schema);

const CreateConcert = () => {
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const { ready } = useTracker(() => {
    // Determine if the subscription is ready
    const rdy = Meteor.user();
    return {
      ready: rdy,
    };
  });
  const currentDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000);
  const submit = (data) => {
    const {
      concertName,
      concertDescription,
      contact,
      concertLocation,
      date,
      createdAt,
      instrumentsNeeded,
      genres,
    } = data;

    if (date < currentDate) {
      swal('Error', 'Please select a future date for the concert.', 'error');
      return;
    }

    Concerts.collection.insert(
      {
        concertName,
        concertDescription,
        contact,
        concertLocation,
        date,
        createdAt,
        instrumentsNeeded,
        genres,
        owner: Meteor.user().emails[0].address,
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal({
            title: 'Success',
            text: 'Concert created successfully',
            icon: 'success',
            button: 'OK',
          }).then(() => setRedirectToRef(true));
        }
      },
    );
  };

  let fRef = null;
  if (redirectToReferer) {
    // Redirect to the desired page after successful submission
    return <Navigate to="/my-concerts" />;
  }

  const transform = (label) => ` ${label}`;
  return ready ? (
    <Container id="create-concert-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card className="p-4 mb-4"> {/* Underlay title with a white box */}
            <Col className="text-center"><h2>Create Concert</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField id="concert-name" name="concertName" showInlineError />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Instruments Needed
                      <SelectField
                        id="concert-instruments"
                        name="instrumentsNeeded"
                        multiple
                        placeholder="Choose instrument(s) needed"
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
                      Genres
                      <SelectField
                        id="concert-genres"
                        name="genres"
                        multiple
                        placeholder="Choose genre(s)"
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
                  <Row>
                    <Col>
                      <DateField
                        id="concert-date"
                        name="date"
                        showInlineError
                        label="Concert Date and Time"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField id="concert-location" name="concertLocation" showInlineError />
                    </Col>
                    <Col>
                      <TextField id="concert-contact" name="contact" placeholder="Phone number, email, or social media handle" showInlineError />
                    </Col>
                  </Row>
                  <LongTextField id="concert-description" name="concertDescription" showInlineError />
                  <SubmitField id="concert-submit" value="Submit" />
                  <HiddenField name="owner" value={Meteor.user().emails[0].address} />
                  <HiddenField name="createdAt" value={new Date()} />
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
