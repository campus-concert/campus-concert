import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profile';
import { Concerts } from '../../api/concert/Concert';

// Initialize the database with a default data document.

const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

const addProfile = (firstName, lastName, image, description, contact, location, goals, instruments, tastes) => {
  console.log(`  Creating profile ${contact}`);
  Profiles.collection.insert({ firstName, lastName, image, description, contact, location, goals, instruments, tastes });
};

/** if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultAccounts.forEach(({ firstName, lastName, image, description, contact, location, goals, instruments, tastes }) => addProfile(firstName, lastName, image, description, contact, location, goals, instruments, tastes));
  }
} */

const addConcert = (concert) => {
  console.log(`  Adding concert: ${concert.concertName} (${concert.owner})`);
  Concerts.collection.insert(concert);
};

/** if (Concerts.collection.find().count() === 0) {
  if (Meteor.settings.defaultConcerts) {
    console.log('Creating default concerts.');
    Meteor.settings.defaultConcerts.forEach(concert => addConcert(concert));
  }
} */

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/concerts.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() === 0)) {
  // Adding users from profile assets
  const profilesFileName = 'profiles.json';
  console.log(`Loading data from private/${profilesFileName}`);
  const profilesData = JSON.parse(Assets.getText(profilesFileName));
  profilesData.profiles.map(({ email, password, role }) => createUser(email, password, role));
  console.log('========================');
  // Adding profiles from profile assets
  profilesData.profiles.map(({ firstName, lastName, image, description, contact, location, goals, instruments, tastes }) => addProfile(firstName, lastName, image, description, contact, location, goals, instruments, tastes));
  console.log('========================');
  // Adding concert assets
  const concertsFileName = 'concerts.json';
  console.log(`Loading data from private/${concertsFileName}`);
  const concertsData = JSON.parse(Assets.getText(concertsFileName));
  concertsData.concerts.map(concert => addConcert(concert));
}
