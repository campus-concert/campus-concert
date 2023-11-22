import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userProfilePage } from './userprofile.page';
import { editProfilePage } from './editprofile.page';
import { userHomePage } from './userhome.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('campus-concert localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the navbar works', async (testController) => {
  await navBar.isDisplayed(testController);
  await navBar.ensureLogout(testController);
  await navBar.checkLoggedOutContent(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.checkLoggedInContent(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await navBar.gotoUserProfile(testController);
  await userProfilePage.isDisplayed(testController);
  await navBar.gotoCreateConcert(testController);
  // await createConcertPage.isDisplayed(testController);
  await navBar.gotoBrowseProfiles(testController);
  // await browseProfilesPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that the user profile page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserProfile(testController);
  await userProfilePage.isDisplayed(testController);
  await userProfilePage.hasProfile(testController);
  await navBar.logout(testController);
});

test('Test editing the user profile', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserProfile(testController);
  await userProfilePage.isDisplayed(testController);
  await userProfilePage.hasEditProfile(testController);
  await userProfilePage.gotoEditProfile(testController);
  await editProfilePage.isDisplayed(testController);
  await editProfilePage.editProfile(testController);
  await userProfilePage.isDisplayed(testController);
  await editProfilePage.checkEditedProfile(testController);
  await userProfilePage.hasEditProfile(testController);
  await userProfilePage.gotoEditProfile(testController);
  await editProfilePage.isDisplayed(testController);
  await editProfilePage.resetEditedProfile(testController);
  await navBar.logout(testController);
});

test('Test that the userhome works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await userHomePage.isDisplayed(testController);
  await userHomePage.showsButtons(testController);
  await userHomePage.gotoUserProfile(testController);
  await userProfilePage.isDisplayed(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.gotoCreateEditConcert(testController);
  // await createConcertPage.isDisplayed(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.gotoBrowseProfiles(testController);
  // await browseProfilesPage.isDisplayed(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.gotoBrowseConcerts(testController);
  // await browseConcertsPage.isDisplayed(testController);
  await navBar.logout(testController);
});
