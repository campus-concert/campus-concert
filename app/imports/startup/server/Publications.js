import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profile';
import { Comments } from '../../api/comment/Comment';
import { Concerts } from '../../api/concert/Concert';

// Bookmarked publications.
Meteor.publish(Concerts.bookmarkedPublicationName, function () {
  if (!this.userId) {
    return this.ready();
  }

  // Query for this user's bookmarked concerts
  const bookmarkedConcerts = Concerts.collection.find(
    { 'bookmarks.userId': this.userId, 'bookmarks.state': true },
  );

  // Extract the concertId's from the bookmarked concerts
  const concertIds = bookmarkedConcerts.map(concert => concert._id);

  // Publish the bookmarked concerts
  return Concerts.collection.find(
    { _id: { $in: concertIds } },
  );
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Profiles.userPublicationName, function () {
  return Profiles.collection.find();
});

Meteor.publish(Concerts.userPublicationName, function () {
  return (
    Concerts.collection.find()
  );
});

Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Comments.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ contact: username });
  }
  return this.ready();
});

Meteor.publish(Concerts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Concerts.collection.find();
  }
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Concerts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Comments.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Comments.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
