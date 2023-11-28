import { Selector } from 'testcafe';

class BrowseProfilesPage {
  constructor() {
    this.pageId = '#browse-profiles-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const browseProfilesPage = new BrowseProfilesPage();
