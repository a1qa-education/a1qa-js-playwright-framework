// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import ConfigReader from '#framework/utils/ConfigReader.js';
import EnvProvider from '#framework/utils/EnvProvider.js';

test('demo test for a successful login', async (
  /** @type {{ pages: any }} */ { pages }
) => {
  const mainPage = await pages.getPage('Main Page');
  const loginPage = await pages.getPage('Login Page');
  const secureAreaPage = await pages.getPage('Secure Area Page');

  const testData = ConfigReader.getTestData();
  await mainPage.clickNavigationLink('Form Authentication');

  await loginPage.waitForPageToLoad();
  expect(await loginPage.isPageOpened()).toBe(true);
  await loginPage.typeUsername(EnvProvider.testUser);
  await loginPage.typePassword(EnvProvider.testPassword);
  await loginPage.clickLoginButton();

  await secureAreaPage.waitForPageToLoad();
  expect(await secureAreaPage.isPageOpened()).toBe(true);
  const message = await secureAreaPage.getMessageText();
  expect(message).toEqual(testData.loginSuccessMessage);

  await secureAreaPage.clickLogoutButton();
  await loginPage.waitForPageToLoad();
  expect(await loginPage.isPageOpened()).toBe(true);
});
