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
    await testController.expect(buttonCount).eql(3);
  }

  async gotoEditProfiles(testController) {
    await testController.click('#edit-profiles');
  }

  async gotoEditConcerts(testController) {
    await testController.click('#edit-concerts');
  }

  async gotoUserComments(testController) {
    await testController.click('#user-comments');
  }

}

export const adminHomePage = new AdminHomePage();
