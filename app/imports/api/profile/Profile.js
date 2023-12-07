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
        allowedValues: [
          'Aiea', 'Ewa Beach', 'Hale\'iwa', 'Hau\'ula', 'Hawaii Kai',
          'Honolulu', 'Ka\'a\'awa', 'Kahala', 'Kahuku', 'Kailua',
          'Kane\'ohe', 'Kapolei', 'La\'ie', 'Lanikai', 'Ma\'ili',
          'Makaha', 'Manoa', 'Mililani', 'Nanakuli', 'Pearl City',
          'Wahiawa', 'Waialua', 'Wai\'anae', 'Waikiki', 'Waimanalo',
          'Waipahu',
        ],
      },
      instruments: {
        type: Array,
        defaultValue: [],
      },
      'instruments.$': {
        type: String,
        allowedValues: [
          'accordion', 'banjo', 'bass guitar', 'bassoon', 'cello', 'clarinet', 'congas', 'drum kit', 'electric guitar',
          'electric keyboard', 'flute', 'guitar', 'harmonica', 'harp', 'mandolin', 'oboe', 'piano', 'saxophone',
          'snare drum', 'sitar', 'synthesizer', 'tambourine', 'timpani', 'trombone', 'trumpet', 'ukulele',
          'viola', 'violin', 'vocals', 'xylophone',
        ],
      },
      tastes: {
        type: Array,
        defaultValue: [],
      },
      'tastes.$': {
        type: String,
        allowedValues: [
          'acoustic', 'alternative', 'ambient', 'blues', 'children\'s', 'classical', 'country',
          'dance', 'electronic', 'experimental', 'folk', 'hip-hop', 'indie', 'industrial', 'jazz', 'latin',
          'metal', 'pop', 'punk', 'rap', 'r&b', 'reggae', 'religious', 'rock', 'soul', 'world',
        ],
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
