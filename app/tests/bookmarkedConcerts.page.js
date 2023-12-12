import { Selector } from 'testcafe';

class BookmarkedConcertsPage {
  constructor() {
    this.pageId = '#bookmarked-concerts';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasConcert(testController) {
    const concert = Selector('#user-concert-card');
    await testController.expect(concert().exists).ok();
  }

}

export const bookmarkedConcertsPage = new BookmarkedConcertsPage();
