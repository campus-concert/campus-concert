import { Selector } from 'testcafe';

class AdminBrowseProfilesPage {
  constructor() {
    this.pageId = '#admin-browse-profiles-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoViewDetails(testController) {
    await testController.click('#admin-view-details');
  }

  async gotoEditProfile(testController) {
    await testController.click('#edit-profile-button');
  }

}

export const adminBrowseProfilesPage = new AdminBrowseProfilesPage();
