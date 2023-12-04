import { Meteor } from 'meteor/meteor';
import { Concerts } from '../imports/api/concert/Concert';

Meteor.methods({
  bookmarkConcert(concertId, bookmarkState) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to bookmark a concert');
    }
    const concert = Concerts.collection.findOne(concertId);
    if (!concert) {
      throw new Meteor.Error('concert-not-found', 'Concert not found');
    }
    // Check if the user has already bookmarked this concert
    const existingBookmark = concert.bookmarks.find(bookmark => bookmark.userId === this.userId);

    if (existingBookmark) {
      // If the user already bookmarked, update the state
      Concerts.collection.update(
        { _id: concertId, 'bookmarks.userId': this.userId },
        { $set: { 'bookmarks.$.state': bookmarkState } }
      );
    } else {
      // If the user hasn't bookmarked, add a new bookmark
      Concerts.collection.update(
        { _id: concertId },
        {
          $push: {
            bookmarks: {
              userId: this.userId,
              state: bookmarkState,
            },
          },
        }
      );
    }
  },
});
