import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfilesCollection. It encapsulates state and variable values for profiles.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      image: String,
      description: String,
      contact: String,
      goals: String,
      owner: String,
      location: {
        type: String,
        allowedValues: ['Honolulu', 'Pearl City', 'Kailua'],
      },
      instruments: {
        type: String,
        allowedValues: ['piano', 'guitar', 'flute', 'trumpet'],
      },
      tastes: {
        type: String,
        allowedValues: ['pop', 'rock', 'hip-hop', 'jazz'],
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
