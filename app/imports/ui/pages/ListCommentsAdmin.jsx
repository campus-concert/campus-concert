import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Row, Col, Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Comments } from '../../api/comment/Comment';
import LoadingSpinner from '../components/LoadingSpinner';

const ListCommentsAdmin = () => {
  const { ready, comments } = useTracker(() => {
    const subscription = Meteor.subscribe(Comments.adminPublicationName);
    const rdy = subscription.ready();
    const commentItems = Comments.collection.find({}).fetch();
    return {
      comments: commentItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="admin-comments-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card className="p-4 mb-4">
            <Container>
              <h2 className="text-center p-3">Questions From Users</h2>
              <Table id="comments-table" striped bordered hover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Comment</th>
                    <th>Submission Date</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => (
                    <tr key={comment._id}>
                      <td id="comment-email">{comment.email}</td>
                      <td id="comment-message">{comment.comment}</td>
                      <td id="comment-creation-date">{comment.createdAt.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCommentsAdmin;
