import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
/**
 * The Comments Collection. It encapsulates state and variable values for comments left by users to admins.
 */

/* Add a custom validator for a schema */
const isValidString = (str) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  return pattern.test(str);
};

class CommentsCollection {
  constructor() {
    this.name = 'CommentsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      email: {
        type: String,
        custom: function () {
          const emailValue = this.value;
          if (!isValidString(emailValue)) {
            return 'Not a Valid Email Address!';
          }
          return undefined;
        },
      },
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
