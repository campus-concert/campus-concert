import { Mongo } from 'meteor/mongo';
import { array } from 'prop-types';
import SimpleSchema from 'simpl-schema';

class ConcertsCollection {
  constructor() {
    this.name = 'ConcertsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      concertName: String,
      concertDescription: String,
      contact: String,
      date: {
        type: String,
        custom: function () {
          const dateRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (0?[1-9]|[12][0-9]|3[01]), \d{4}$/;
          if (!dateRegex.test(this.value)) {
            return 'Invalid date format. Please use Month Day, Year (e.g., "Feb 2, 2024").';
          }
          return undefined;
        },
        autoValue: function () {
          // Capitalize the first letter of the month
          if (this.isSet && typeof this.value === 'string') {
            const [month, day, year] = this.value.split(/, | /);
            const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
            const formattedDate = `${formattedMonth} ${day}, ${year}`;
            return formattedDate;
          }
          return this.value;
        },
      },
      time: {
        type: String,
        custom: function () {
          const timeRegex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i;
          if (!timeRegex.test(this.value)) {
            return 'Invalid time format. Please use hh:mm AM/PM.';
          }
          return undefined;
        },
        autoValue: function () {
          // If the time is in the correct format, format it
          if (this.isSet && typeof this.value === 'string') {
            const [hour, minutes, period] = this.value.split(/:| /);
            const formattedTime = `${hour.padStart(2, '0')}:${minutes} ${period.toUpperCase()}`;
            return formattedTime;
          }
          // Otherwise, leave it unchanged
          return this.value;
        },
      },
      concertLocation: String,
      owner: String,
      instrumentsNeeded: {
        type: Array,
        defaultValue: [],
      },
      'instrumentsNeeded.$': {
        type: String,
        allowedValues: ['piano', 'guitar', 'flute', 'trumpet'],
      },
      genres: {
        type: Array,
        defaultValue: [],
      },
      'genres.$': {
        type: String,
        allowedValues: ['pop', 'rock', 'hip-hop', 'jazz'],
      },
      bookmarks: {
        type: Array,
        optional: true,
        defaultValue: [],
      },
      'bookmarks.$': {
        type: Object,
        blackbox: true,
        optional: true,
      },
      'bookmarks.$.userId': {
        type: String,
      },
      'bookmarks.$.state': {
        type: Boolean,
      },
    });

    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.bookmarkedPublicationName = `${this.name}.publication.bookmarked`;
  }
}

export const Concerts = new ConcertsCollection();
