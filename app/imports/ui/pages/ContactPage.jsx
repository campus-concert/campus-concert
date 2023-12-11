import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Comments } from '../../api/comment/Comment';

// Create a schema to specify the structure of the data to appear in the form.
const bridge = new SimpleSchema2Bridge(Comments.schema);
const ContactPage = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { email, comment, createdAt } = data;
    Comments.collection.insert(
      { email, comment, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="contact-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Col className="text-center mb-3"> {/* Added this line */}
                  <h2>Got a Question?</h2>
                </Col>
                <Card>
                  <Card.Body>
                    <TextField id="contact-email" name="email" label="Email" />
                    <LongTextField id="contact-message" name="comment" label="Message" />
                    <SubmitField id="contact-submit-button" value="Submit" />
                    <HiddenField name="createdAt" value={new Date()} />
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};
export default ContactPage;
