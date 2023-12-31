import { Selector } from 'testcafe';

class NavBar {

  async isDisplayed(testController) {
    await testController.expect(Selector('#navbar').exists).ok();
  }

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  async checkLoggedOutContent(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).notOk();
    await testController.expect(Selector('#login-dropdown').exists).ok();
    await testController.expect(Selector('#home-nav').exists).ok();
    await testController.expect(Selector('#user-profile-nav').exists).notOk();
    await testController.expect(Selector('#browse-profiles-nav').exists).notOk();
    await testController.expect(Selector('#add-concert-na').exists).notOk();
    await testController.expect(Selector('#browse-concerts-nav').exists).notOk();
    await testController.expect(Selector('#my-concerts-nav').exists).notOk();
  }

  async checkLoggedInContent(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.expect(Selector('#login-dropdown').exists).notOk();
    await testController.expect(Selector('#home-nav').exists).ok();
    await testController.expect(Selector('#browse-profiles-nav').exists).ok();
    await testController.expect(Selector('#browse-concerts-nav').exists).ok();
    await testController.expect(Selector('#create-concert-nav').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.expect(Selector('#user-profile-nav').exists).ok();
    await testController.expect(Selector('#bookmarked-concerts-nav').exists).ok();
    await testController.expect(Selector('#my-concerts-nav').exists).ok();
  }

  async checkUserContent(testController) {
    await this.checkLoggedInContent(testController);
    await testController.expect(Selector('#admin-home').exists).notOk();
  }

  async checkAdminContent(testController) {
    await this.checkLoggedInContent(testController);
    await testController.expect(Selector('#admin-dropdown-nav').exists).ok();
    await testController.click('#admin-dropdown-nav');
    await testController.expect(Selector('#admin-home-nav').exists).ok();
    await testController.expect(Selector('#admin-browse-profiles-nav').exists).ok();
    await testController.expect(Selector('#admin-browse-concerts-nav').exists).ok();
    await testController.expect(Selector('#admin-comments-nav').exists).ok();
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async clickNavbarBrand(testController) {
    await testController.click('#home-nav');
  }

  async gotoUserHome(testController) {
    await testController.click('#home-two-nav');
  }

  async gotoUserProfile(testController) {
    if (!await Selector('#user-profile-nav').visible) {
      await testController.click('#navbar-current-user');
    }
    await testController.click('#user-profile-nav');
  }

  async gotoBrowseProfiles(testController) {
    await testController.click('#browse-profiles-nav');
  }

  async gotoCreateConcert(testController) {
    await testController.click('#create-concert-nav');
  }

  async gotoBrowseConcerts(testController) {
    await testController.click('#browse-concerts-nav');
  }

  async gotoMyConcerts(testController) {
    if (!await Selector('#my-concerts-nav').visible) {
      await testController.click('#navbar-current-user');
    }
    await testController.click('#my-concerts-nav');
  }

  async gotoAdminHome(testController) {
    if (!await Selector('#admin-home-nav').visible) {
      await testController.click('#admin-dropdown-nav');
    }
    await testController.click('#admin-home-nav');
  }

}

export const navBar = new NavBar();
