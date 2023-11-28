import { Selector } from 'testcafe';

class CreateConcertPage {
  constructor() {
    this.pageId = '#create-concert-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const createConcertPage = new CreateConcertPage();
