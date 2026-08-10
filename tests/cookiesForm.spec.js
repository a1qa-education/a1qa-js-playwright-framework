import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import WelcomePage from './pages/WelcomePage.js';

test('cookies form test', async ({ customBrowser: browser }) => {
  const welcomePage = new WelcomePage(browser.page);
  await welcomePage.clickHereToGoLink();

  const cookiesForm = new MainPage(browser.page).cookiesForm;
  await cookiesForm.clickAcceptCookiesButton();
  expect(await cookiesForm.isPageOpened()).toBe(false);
});
