// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import JavaScriptAlertsPage from './pages/JavaScriptAlertsPage.js';

const successfulMessage = 'You successfully clicked an alert';

test.beforeEach(async ({ customBrowser: browser }) => {
  await browser.openUrl('https://the-internet.herokuapp.com');
});

test('successful message should be displayed after alert handling', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  // Navigate to 'JavaScript Alerts'

  
  browser.page.on('dialog', dialog => dialog.accept());
  const javaScriptAlertsPage = new JavaScriptAlertsPage(browser.page);
  expect(await javaScriptAlertsPage.isPageOpened()).toBe(true);
  await javaScriptAlertsPage.clickForJSAlertButton();
  
  // Add assertion to check successfulMessage

});
