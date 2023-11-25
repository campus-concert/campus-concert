import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ConcertsCollection {
  constructor() {
    this.name = 'ConcertsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      owner: String,
      image: String,
      description: String,
      contact: String,
      date: String,
      time: String,
      location: {
        type: String,
        allowedValues: ['Honolulu', 'Pearl City', 'Kailua'],
      },
      instruments: {
      concertName: String,
      concertDescription: String,
      concertContact: String,
      date: String,
      time: String,
      concertLocation: String,
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

    });

    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Concerts = new ConcertsCollection();
