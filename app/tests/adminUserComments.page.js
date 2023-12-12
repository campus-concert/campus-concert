import { Selector } from 'testcafe';

class AdminUserCommentsPage {
  constructor() {
    this.pageId = '#admin-comments-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async checkDetails(testController) {
    const table = Selector('#comments-table');
    const cellText = await table.find('tr').nth(1).find('td').nth(0).innerText;
    const cellText2 = await table.find('tr').nth(1).find('td').nth(1).innerText;
    await testController.expect(cellText).contains('test@email.com');
    await testController.expect(cellText2).contains('Edit');
  }
}

export const adminUserCommentsPage = new AdminUserCommentsPage();
