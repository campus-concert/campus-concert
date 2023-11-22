import { Selector } from 'testcafe';

class UserHomePage {
  constructor() {
    this.pageId = '#userhome-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async showsButtons(testController) {
    const buttonCount = Selector('#userhome-button').count;
    await testController.expect(buttonCount).eql(4);
  }

  async gotoUserProfile(testController) {
    await testController.click('#view-profile');
  }

  async gotoCreateEditConcert(testController) {
    await testController.click('#create-edit-concert');
  }

  async gotoBrowseProfiles(testController) {
    await testController.click('#browse-profiles');
  }

  async gotoBrowseConcerts(testController) {
    await testController.click('#browse-concerts');
  }
}

export const userHomePage = new UserHomePage();
