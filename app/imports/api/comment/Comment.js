import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
/**
 * The Comments Collection. It encapsulates state and variable values for comments left by users to admins.
 */

class CommentsCollection {
  constructor() {
    this.name = 'CommentsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      email: String,
      comment: String,
      createdAt: Date,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the NotesCollection.
 * @type {CommentsCollection}
 */
export const Comments = new CommentsCollection();
