import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profile';

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

const addProfile = (firstName, lastName, image, description, contact, location, goals, instruments, tastes) => {
  console.log(`  Adding: ${lastName} (${contact})`);
  Profiles.collection.insert({ firstName, lastName, image, description, contact, location, goals, instruments, tastes });
};

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultAccounts.forEach(({ firstName, lastName, image, description, contact, location, goals, instruments, tastes }) => addProfile(firstName, lastName, image, description, contact, location, goals, instruments, tastes));
  }
}
