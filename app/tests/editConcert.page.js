import { Selector } from 'testcafe';

class EditConcertPage {
  constructor() {
    this.pageId = '#edit-concert-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editConcert(testController) {
    await this.clearForm(testController);
    await testController.typeText('#edit-concert-name', 'Edit');
    await testController.typeText('#edit-concert-description', 'Edit');
    await testController.expect(Selector('#edit-concert-submit').exists).ok();
    await testController.click(Selector('#edit-concert-submit > .btn'));
    await testController.click(Selector('.swal-overlay > .swal-modal > .swal-footer > .swal-button-container > .swal-button'));
    await testController.wait(3000);
    await testController.navigateTo('http://localhost:3000/my-concerts');
  }

  async checkEditedConcert(testController) {
    await testController.click(Selector('#concert-basic-card'));
    await testController.expect(Selector('#concert-name').innerText).contains('Edit');
    await testController.expect(Selector('#concert-description').innerText).contains('Edit');
  }

  async resetEditedConcert(testController) {
    await this.clearForm(testController);
    await testController.typeText('#edit-concert-name', 'Canal Chaos Concert');
    await testController.typeText('#edit-concert-description', 'This is a description.');
    await testController.expect(Selector('#edit-concert-submit').exists).ok();
    await testController.click(Selector('#edit-concert-submit > .btn'));
    await testController.click(Selector('.swal-overlay > .swal-modal > .swal-footer > .swal-button-container > .swal-button'));
    await testController.wait(3000);
    await testController.navigateTo('http://localhost:3000/my-concerts');
  }

  async clearForm(testController) {
    await testController
      .click('#edit-concert-name')
      .pressKey('ctrl+a delete');
    await testController
      .click('#edit-concert-description')
      .pressKey('ctrl+a delete');
  }
}

export const editConcertPage = new EditConcertPage();
