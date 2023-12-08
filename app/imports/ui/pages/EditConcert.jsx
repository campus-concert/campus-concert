import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, LongTextField, TextField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Concerts.schema);

/* Renders the AddStuff page for adding a document. */
const EditConcert = () => {

  const [redirectToReferer, setRedirectToRef] = useState(false);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();

  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Concerts.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Concerts.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // On submit, insert the data.

  const currentDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000);
  const submit = (data) => {
    const { concertName, concertDescription, contact, concertLocation, date, instrumentsNeeded, genres } = data;

    if (date < currentDate) {
      swal('Error', 'Please select a future date for the concert.', 'error');
      return;
    }
    Concerts.collection.update(
      _id,
      {
        $set: {
          concertName,
          concertDescription,
          contact,
          concertLocation,
          date,
          instrumentsNeeded,
          genres,
        },
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal({
            title: 'Success',
            text: 'Concert updated successfully',
            icon: 'success',
            button: 'OK',
          }).then(() => setRedirectToRef(true));
        }
      },
    );
  };

  const removeConcert = () => {
    // Display a confirmation dialog before deleting
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this concert!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // Remove the concert from the collection
          Concerts.collection.remove(_id, (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'Concert deleted successfully',
                icon: 'success',
                button: 'OK',
              }).then(() => setRedirectToRef(true));
            }
          });
        }
      });
  };

  if (redirectToReferer) {
    return <Navigate to="/my-concerts" />;
  }
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms

  const transform = (label) => ` ${label}`;
  return ready ? (
    <Container id="edit-concert-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card className="p-4 mb-4"> {/* Underlay title with a white box */}
            <Col className="text-center"><h2>Edit Concert</h2></Col>
            { doc ? (
              <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col>
                        <TextField id="edit-concert-name" name="concertName" showInlineError />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        Instruments Needed
                        <SelectField
                          id="edit-concert-instruments"
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
                          id="edit-concert-genres"
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
                          id="edit-concert-date"
                          name="date"
                          showInlineError
                          label="Concert Date and Time"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <TextField id="edit-concert-location" name="concertLocation" showInlineError />
                      </Col>
                      <Col>
                        <TextField
                          id="edit-concert-contact"
                          name="contact"
                          placeholder="Phone number, email, or social media handle"
                          showInlineError
                        />
                      </Col>
                    </Row>
                    <LongTextField id="edit-concert-description" name="concertDescription" showInlineError />
                    <SubmitField id="edit-concert-submit" value="Submit" />
                    <ErrorsField />
                  </Card.Body>
                </Card>
              </AutoForm>
            ) : (
              <p>You do not have permission to edit this Concert, or it might not exist.</p>
            )}
            { doc ? (
              <Row className="mt-3">
                <Col className="text-center">
                  <button type="button" className="btn btn-danger" onClick={removeConcert}>
                    Delete Concert
                  </button>
                </Col>
              </Row>
            ) : ''}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditConcert;
