import { Selector } from 'testcafe';

class BrowseConcertsPage {
  constructor() {
    this.pageId = '#browse-all-concerts';
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

  async viewDetails(testController) {
    await testController.click('#user-concert-card');
  }

  async hasEditConcert(testController) {
    const editProfile = Selector('#edit-concert-button');
    await testController.expect(editProfile.exists).ok();
  }

  async gotoEditConcert(testController) {
    await testController.click('#edit-concert-button');
  }

  async hasRemoveConcert(testController) {
    const deleteConcert = Selector('#delete-concert-button');
    await testController.expect(deleteConcert.exists).ok();
  }

  async gotoRemoveConcert(testController) {
    await testController.click('#delete-concert-button');
  }

  async hasLoadButton(testController) {
    const loadButton = Selector('#load-more-button');
    await testController.expect(loadButton.exists).ok();
  }

  async gotoLoadButton(testController) {
    await testController.click('#load-more-button');
  }

  async hasBookmarkButton(testController) {
    const bookmarkButton = Selector('#bookmark-button');
    await testController.expect(bookmarkButton.exists).ok();
  }

  async clickBookmarkButton(testController) {
    await testController.click('#bookmark-button');
  }

}

export const browseConcertsPage = new BrowseConcertsPage();
