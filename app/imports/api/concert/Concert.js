import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ConcertsCollection {

  constructor() {
    this.allowedInstruments = [
      'accordion', 'banjo', 'bass guitar', 'bassoon', 'cello', 'clarinet', 'congas', 'drum kit',
      'electric keyboard', 'flute', 'guitar', 'harmonica', 'harp', 'mandolin', 'oboe', 'piano', 'saxophone',
      'snare drum', 'sitar', 'synthesizer', 'tambourine', 'timpani', 'trombone', 'trumpet', 'ukulele',
      'viola', 'violin', 'vocals', 'xylophone',
    ];
    this.allowedGenres = [
      'acoustic', 'alternative', 'ambient', 'blues', 'children\'s', 'classical', 'country',
      'dance', 'electronic', 'experimental', 'folk', 'hip-hop', 'industrial', 'jazz', 'latin',
      'metal', 'pop', 'punk', 'rap', 'r&b', 'reggae', 'religious', 'rock', 'soul', 'world',
    ];
    this.name = 'ConcertsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      concertName: {
        type: String,
        max: 30,
      },
      concertDescription: String,
      contact: String,
      date: Date,
      createdAt: Date,
      concertLocation: String,
      owner: String,
      instrumentsNeeded: {
        type: Array,
        defaultValue: [],
      },
      'instrumentsNeeded.$': {
        type: String,
        allowedValues: this.allowedInstruments,
      },
      genres: {
        type: Array,
        defaultValue: [],
      },
      'genres.$': {
        type: String,
        allowedValues: this.allowedGenres,
      },
    });

    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Concerts = new ConcertsCollection();
