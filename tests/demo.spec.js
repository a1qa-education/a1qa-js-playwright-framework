// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import SecureAreaPage from './pages/SecureAreaPage.js';
import { testData } from '#framework/utils/ConfigReader.js';

test('demo test for a successful login',
  async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('Form Authentication');

  const loginPage = new LoginPage(browser.page);
  expect(await loginPage.isPageOpened()).toBe(true);
  await loginPage.typeUsername(testData.loginCredentials.user);
  await loginPage.typePassword(testData.loginCredentials.password);
  await loginPage.clickLoginButton();

  const secureAreaPage = new SecureAreaPage(browser.page);
  expect(await secureAreaPage.isPageOpened()).toBe(true);
  const message = await secureAreaPage.getMessageText();
  expect(message).toEqual(testData.loginSuccessMessage);

  await secureAreaPage.clickLogoutButton();
  expect(await loginPage.isPageOpened()).toBe(true);
});
