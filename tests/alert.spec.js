// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import JavaScriptAlertsPage from './pages/JavaScriptAlertsPage.js';

const successfulMessage = 'You successfully clicked an alert';

test('successful message should be displayed after alert handling', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  // Navigate to 'JavaScript Alerts'
  await mainPage.clickNavigationLink('JavaScript Alerts');
  const javaScriptAlertsPage = new JavaScriptAlertsPage(browser.page);
  expect(await javaScriptAlertsPage.isPageOpened()).toBe(true);
  await browser.acceptAlert(async () => javaScriptAlertsPage.clickForJSAlertButton());

  // Add assertion to check successfulMessage
  expect(await javaScriptAlertsPage.getResultText()).toBe(successfulMessage);
});