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

  async hasViewDetails(testController) {
    await testController.expect('#view-details').ok();
  }

  async gotoViewDetails(testController) {
    await testController.click('#view-details');
  }

}

export const browseProfilesPage = new BrowseProfilesPage();
