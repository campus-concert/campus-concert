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

}

export const browseConcertsPage = new BrowseConcertsPage();
