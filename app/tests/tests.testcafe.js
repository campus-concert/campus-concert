import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { footer } from './footer.component';
import { userHomePage } from './userHome.page';
import { userProfilePage } from './userProfile.page';
import { editProfilePage } from './editProfile.page';
import { editConcertPage } from './editConcert.page';
import { browseProfilesPage } from './browseProfiles.page';
import { browseConcertsPage } from './browseConcerts.page';
import { adminHomePage } from './adminHome.page';
import { adminBrowseProfilesPage } from './adminBrowseProfiles.page';
import { adminBrowseConcertsPage } from './adminBrowseConcerts.page';
import { adminUserCommentsPage } from './adminUserComments.page';
import { contactPage } from './contact.page';
import { bookmarkedConcertsPage } from './bookmarkedConcerts.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

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
  await navBar.checkUserContent(testController);
  await navBar.clickNavbarBrand(testController);
  await userHomePage.isDisplayed(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await navBar.gotoUserProfile(testController);
  await userProfilePage.isDisplayed(testController);
  await navBar.gotoBrowseProfiles(testController);
  await browseProfilesPage.isDisplayed(testController);
  await navBar.gotoBrowseConcerts(testController);
  await browseConcertsPage.isDisplayed(testController);
  await navBar.gotoCreateConcert(testController);
  await navBar.logout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  await navBar.checkAdminContent(testController);
  await navBar.gotoAdminHome(testController);
  await adminHomePage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that the footer works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await footer.isDisplayed(testController);
  await footer.gotoUserProfile(testController);
  await userProfilePage.isDisplayed(testController);
  await footer.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await footer.gotoMyConcerts(testController);
  await footer.gotoBookmarks(testController);
  await bookmarkedConcertsPage.isDisplayed(testController);
  await footer.gotoCreateConcert(testController);
  await footer.gotoBrowseProfiles(testController);
  await browseProfilesPage.isDisplayed(testController);
  await footer.gotoBrowseConcerts(testController);
  await browseConcertsPage.isDisplayed(testController);
  await footer.gotoContactPage(testController);
  await contactPage.isDisplayed(testController);
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
  await userHomePage.gotoCreateConcert(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.gotoMyConcerts(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.gotoBrowseProfiles(testController);
  await browseProfilesPage.isDisplayed(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.gotoBrowseConcerts(testController);
  await browseConcertsPage.isDisplayed(testController);
  await navBar.gotoUserHome(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.gotoBookmarkedConcerts(testController);
  await bookmarkedConcertsPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that the adminhome works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  await adminHomePage.isDisplayed(testController);
  await adminHomePage.showsButtons(testController);
  await adminHomePage.gotoEditProfiles(testController);
  await adminBrowseProfilesPage.isDisplayed(testController);
  await navBar.gotoAdminHome(testController);
  await adminHomePage.isDisplayed(testController);
  await adminHomePage.gotoEditConcerts(testController);
  await adminBrowseConcertsPage.isDisplayed(testController);
  await navBar.gotoAdminHome(testController);
  await adminHomePage.isDisplayed(testController);
  await adminHomePage.gotoUserComments(testController);
  await adminUserCommentsPage.isDisplayed(testController);
  await navBar.logout(testController);
});

test('Test that browse profiles work', async (testController) => {
  // Check non-admin profile browse profiles
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoBrowseProfiles(testController);
  await browseProfilesPage.isDisplayed(testController);
  await browseProfilesPage.hasViewDetails(testController);
  await browseProfilesPage.gotoViewDetails(testController);
  await navBar.gotoBrowseConcerts(testController);
  await browseConcertsPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
  // Check admin profile browse profiles
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  await adminHomePage.isDisplayed(testController);
  await adminHomePage.gotoEditProfiles(testController);
  await adminBrowseProfilesPage.gotoViewDetails(testController);
  await adminBrowseProfilesPage.gotoEditProfile(testController);
  await editProfilePage.isDisplayed(testController);
});

test('Test that browse concerts work', async (testController) => {
  // Check non-admin browse concerts
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoBrowseConcerts(testController);
  await browseConcertsPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
  // Check admin profile browse profiles
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  await adminHomePage.isDisplayed(testController);
  await adminHomePage.gotoEditConcerts(testController);
  await adminBrowseConcertsPage.gotoEditConcert(testController);
  await editConcertPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that contact us page works', async (testController) => {
  await navBar.isDisplayed(testController);
  await navBar.ensureLogout(testController);
  await navBar.checkLoggedOutContent(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await footer.gotoContactPage(testController);
  await contactPage.isDisplayed(testController);
  await contactPage.submitQuestion(testController);
  await navBar.logout(testController);
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  await navBar.gotoAdminHome(testController);
  await adminHomePage.isDisplayed(testController);
  await adminHomePage.gotoUserComments(testController);
  await adminUserCommentsPage.isDisplayed(testController);
  await adminUserCommentsPage.checkDetails(testController);
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

test('Test editing a user concert', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoMyConcerts(testController);
  await testController.click('#edit-concert-button');
  await editConcertPage.isDisplayed(testController);
  await editConcertPage.editConcert(testController);
  await editConcertPage.checkEditedConcert(testController);
  await testController.click('#edit-concert-button');
  await editConcertPage.resetEditedConcert(testController);
  await navBar.logout(testController);
});
