import { Selector } from 'testcafe';

class ContactPage {
  constructor() {
    this.pageId = '#contact-page';
    this.pageSelector = Selector(this.pageId);
    this.submitButton = Selector("#contact-submit-button > .btn")
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async submitQuestion(testController) {
    await testController.typeText("#contact-email", 'test@email.com');
    await testController.typeText('#contact-message', 'Edit');
    await testController.click(this.submitButton);
    await testController.wait(3000);
    await testController.click(Selector('.swal-overlay > .swal-modal > .swal-footer > .swal-button-container > .swal-button'));
  }
}

export const contactPage = new ContactPage();
