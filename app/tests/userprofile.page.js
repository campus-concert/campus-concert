import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#user-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasProfile(testController) {
    const profile = Selector('#user-profile-card');
    await testController.expect(profile.exists).ok();
  }

  async hasEditProfile(testController) {
    const editProfile = Selector('#edit-profile-button');
    await testController.expect(editProfile.exists).ok();
  }

  async gotoEditProfile(testController) {
    await testController.click('#edit-profile-button');
  }

}

export const userProfilePage = new UserProfilePage();
