// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import JavaScriptAlertsPage from './pages/JavaScriptAlertsPage.js';
import ConfigReader from '#framework/utils/ConfigReader.js';

test('successful message should be displayed after alert handling', async ({ customBrowser: browser }) => {
  const testData = ConfigReader.getTestData();

  const mainPage = new MainPage(browser.page);
  // Navigate to 'JavaScript Alerts'


  const javaScriptAlertsPage = new JavaScriptAlertsPage(browser.page);
  expect(await javaScriptAlertsPage.isPageOpened()).toBe(true);
  await browser.acceptAlert(() => javaScriptAlertsPage.clickForJSAlertButton());
  expect(await javaScriptAlertsPage.getResultText()).toBe(testData.successfulAlertMessage);
});
