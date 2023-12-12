import { Selector } from 'testcafe';

class AdminBrowseConcertsPage {
  constructor() {
    this.pageId = '#admin-browse-concerts-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEditConcert(testController) {
    await testController.click('#edit-concert-button');
  }

}

export const adminBrowseConcertsPage = new AdminBrowseConcertsPage();
