import { Selector } from 'testcafe';

class BrowseConcertsPage {
  constructor() {
    this.pageId = '#browse-concerts-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const browseConcertsPage = new BrowseConcertsPage();
