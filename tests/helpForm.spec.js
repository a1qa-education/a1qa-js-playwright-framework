import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import WelcomePage from './pages/WelcomePage.js';

test('help form can be collapsed', async ({ customBrowser: browser }) => {
  const welcomePage = new WelcomePage(browser.page);
  await welcomePage.clickHereToGoLink();

  const helpForm = new MainPage(browser.page).helpForm;
  helpForm.waitForPageToLoad();
  expect(await helpForm.isPageOpened()).toBe(true);
  helpForm.clickSendToBottomButton();
  expect(await helpForm.isPageOpened()).toBe(false);
});
