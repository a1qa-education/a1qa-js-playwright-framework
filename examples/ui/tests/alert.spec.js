// @ts-check
import Browser from '../../../framework/ui/browser/Browser.js';
import { test, expect } from '../../../framework/ui/fixtures/browser.fixture.js';
import JavaScriptAlertsPage from '../pages/JavaScriptAlertsPage.js';
import MainPage from '../pages/MainPage.js';

const successfulMessage = 'You successfully clicked an alert';

test.beforeEach(
  /**
   * @param {{ browser: Browser }} fixtures
   */
  async ( { browser }) => {
  await browser.openUrl('https://the-internet.herokuapp.com');
});

test(
    'successful message should be displayed after alert handling', 
  /**
  * @param {{ browser: Browser }} fixtures
  */
  async ({ browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('JavaScript Alerts');

  const javaScriptAlertsPage = new JavaScriptAlertsPage(browser.page);
  expect(await javaScriptAlertsPage.isPageOpened()).toBe(true);
  await browser.acceptAlert(()=> javaScriptAlertsPage.clickForJSAlertButton());
  expect(await javaScriptAlertsPage.getResultText()).toBe(successfulMessage);
  
  browser.navigateBack();
  await mainPage.waitForPageToLoad();
  expect(await mainPage.isPageOpened()).toBe(true);
  browser.navigateForward();
  await javaScriptAlertsPage.waitForPageToLoad();
  expect(await javaScriptAlertsPage.isPageOpened()).toBe(true);
});
