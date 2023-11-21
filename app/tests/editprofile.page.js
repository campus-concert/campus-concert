import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController, firstName, lastName, image, description, goal, location, instruments, tastes) {
    await testController.typeText('#edit-profile-first-name', firstName);
    await testController.typeText('#edit-profile-last-name', lastName);
    await testController.typeText('#edit-profile-image', image);
    await testController.typeText('#edit-profile-description', description);
    await testController.typeText('#edit-profile-goal', goal);
    await testController.typeText('#edit-profile-location', location);
    await testController.typeText('#edit-profile-instruments', instruments);
    await testController.typeText('#edit-profile-tastes', tastes);
    await testController.click('#edit-profile-submit');
  }
}

export const editProfilePage = new EditProfilePage();
