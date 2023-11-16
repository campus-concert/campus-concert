import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ProfilesCollection {
  constructor() {
    this.name = 'ProfilesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      image: String,
      description: String,
      contact: String,
      goals: String,
      location: {
        type: String,
        allowedValues: ['Honolulu', 'Pearl City', 'Kailua'],
      },
      instruments: {
        type: Array,
        defaultValue: [],
      },
      'instruments.$': {
        type: String,
        allowedValues: ['piano', 'guitar', 'flute', 'trumpet'],
      },
      tastes: {
        type: Array,
        defaultValue: [],
      },
      'tastes.$': {
        type: String,
        allowedValues: ['pop', 'rock', 'hip-hop', 'jazz'],
      },
      youtubeLink: { type: String, optional: true, defaultValue: '' },
      spotifyLink: { type: String, optional: true, defaultValue: '' },
      soundcloudLink: { type: String, optional: true, defaultValue: '' },
    });

    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Profiles = new ProfilesCollection();
