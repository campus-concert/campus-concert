import { Selector } from 'testcafe';

class AdminHomePage {
  constructor() {
    this.pageId = '#adminhome-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async showsButtons(testController) {
    const buttonCount = Selector('#adminhome-button').count;
    await testController.expect(buttonCount).eql(5);
  }

  async gotoDeleteProfile(testController) {
    await testController.click('#delete-profile');
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

  async gotoUserComments(testController) {
    await testController.click('#user-comments');
  }

}

export const adminHomePage = new AdminHomePage();
