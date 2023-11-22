import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController) {
    await testController.typeText('#edit-profile-first-name', 'Edit');
    await testController.typeText('#edit-profile-last-name', 'Edit');
    // await testController.typeText('#edit-profile-image', 'Edit');
    await testController.typeText('#edit-profile-description', 'Edit');
    await testController.typeText('#edit-profile-goal', 'Edit');
    await testController.typeText('#edit-profile-location', 'Honolulu');
    await testController.pressKey('enter');
    await testController.wait(3000);
    await testController.navigateTo('http://localhost:3000/userprofile');
  }

  async checkEditedProfile(testController) {
    await testController.expect(Selector('#profile-name').innerText).contains('Edit');
    await testController.expect(Selector('#profile-location').innerText).contains('Honolulu');
    await testController.expect(Selector('#profile-goal').innerText).contains('Edit');
    await testController.expect(Selector('#profile-description').innerText).contains('Edit');
  }

  async resetEditedProfile(testController) {
    await this.clearForm(testController);
    await testController.typeText('#edit-profile-first-name', 'John');
    await testController.typeText('#edit-profile-last-name', 'Foo');
    // await testController.typeText('#edit-profile-image', 'Edit');
    await testController.typeText('#edit-profile-description', 'John Foo is a fictional user.');
    await testController.typeText('#edit-profile-goal', 'Survive college');
    await testController.typeText('#edit-profile-location', 'Pearl City');
    await testController.pressKey('enter');
    await testController.wait(3000);
    await testController.navigateTo('http://localhost:3000/userprofile');
  }

  async clearForm(testController) {
    await testController
      .click('#edit-profile-first-name')
      .pressKey('ctrl+a delete');
    await testController
      .click('#edit-profile-last-name')
      .pressKey('ctrl+a delete');
    await testController
      .click('#edit-profile-description')
      .pressKey('ctrl+a delete');
    await testController
      .click('#edit-profile-goal')
      .pressKey('ctrl+a delete');
  }
}

export const editProfilePage = new EditProfilePage();
