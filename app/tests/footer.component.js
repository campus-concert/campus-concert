import { Selector } from 'testcafe';

class Footer {

  async isDisplayed(testController) {
    await testController.expect(Selector('#footer').exists).ok();
  }

  async gotoContactPage(testController) {
    await testController.click('#contact-button');
  }
}

export const footer = new Footer();
