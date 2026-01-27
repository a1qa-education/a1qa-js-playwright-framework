// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import JavaScriptAlertsPage from '../pages/JavaScriptAlertsPage.js';
import MainPage from '../pages/MainPage.js';

const successfulMessage = 'You successfully clicked an alert';

test('demo test for alerts', 
  async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('JavaScript Alerts');

  const javaScriptAlertsPage = new JavaScriptAlertsPage(browser.page);
  expect(await javaScriptAlertsPage.isPageOpened()).toBe(true);
  await browser.acceptAlert(()=> javaScriptAlertsPage.clickForJSAlertButton());
  expect(await javaScriptAlertsPage.getResultText()).toBe(successfulMessage);}
);
