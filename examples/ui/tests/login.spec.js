// @ts-check
import { test, expect } from '../../../framework/ui/fixtures/browser.fixture.js';
import MainPage from '../pages/MainPage.js';
import LoginPage from '../pages/LoginPage.js';
import SecureAreaPage from '../pages/SecureAreaPage.js';

const username = 'tomsmith';
const password = 'SuperSecretPassword!';
const successfulMessage = 'Welcome to the Secure Area. When you are done click logout below.';

test.beforeEach(async ( { browser }) => {
  await browser.openUrl('https://the-internet.herokuapp.com');
});

test('successful message should be displayed after logging into secure area', async ({ browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('Form Authentication');

  const loginPage = new LoginPage(browser.page);
  expect(await loginPage.isPageOpened()).toBe(true);
  await loginPage.typeUsername(username);
  await loginPage.typePassword(password);
  await loginPage.clickLoginButton();

  const secureAreaPage = new SecureAreaPage(browser.page);
  expect(await secureAreaPage.isPageOpened()).toBe(true);
  const message = await secureAreaPage.getMessageText();
  expect(message).toEqual(successfulMessage);

  await secureAreaPage.clickLogoutButton();
  expect(await loginPage.isPageOpened()).toBe(true);
});
