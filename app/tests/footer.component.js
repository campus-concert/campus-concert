import { Selector } from 'testcafe';

class Footer {

  async isDisplayed(testController) {
    await testController.expect(Selector('#footer').exists).ok();
  }

  async gotoUserHome(testController) {
    await testController.click('#userhome-footer');
  }

  async gotoUserProfile(testController) {
    await testController.click('#userprofile-footer');
  }

  async gotoMyConcerts(testController) {
    await testController.click('#myconcerts-footer');
  }

  async gotoBookmarks(testController) {
    await testController.click('#bookmarks-footer');
  }

  async gotoCreateConcert(testController) {
    await testController.click('#create-concert-footer');
  }

  async gotoBrowseProfiles(testController) {
    await testController.click('#browse-profiles-footer');
  }

  async gotoBrowseConcerts(testController) {
    await testController.click('#browse-concerts-footer');
  }

  async gotoContactPage(testController) {
    await testController.click('#contact-button');
  }

}

export const footer = new Footer();
