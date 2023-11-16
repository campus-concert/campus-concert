import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table } from 'react-bootstrap';
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
    <Container>
      <h2 className="text-center p-3">Questions From Users</h2>
      <Table striped bordered hover>
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
              <td>{comment.email}</td>
              <td>{comment.comment}</td>
              <td>{comment.createdAt.toString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCommentsAdmin;
