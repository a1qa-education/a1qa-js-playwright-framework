import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import SecureAreaPage from '../pages/SecureAreaPage.js';
import ConfigReader from '#framework/utils/ConfigReader.js';
import EnvProvider from '#framework/utils/EnvProvider.js';

When('I log in with valid credentials', async function () {
  const loginPage = new LoginPage(this.browserWrapper.page);
  await loginPage.waitForPageToLoad();
  await loginPage.typeUsername(EnvProvider.testUser);
  await loginPage.typePassword(EnvProvider.testPassword);
  await loginPage.clickLoginButton();
});

Then('the Secure Area page should be open', async function () {
  const secureAreaPage = new SecureAreaPage(this.browserWrapper.page);
  await secureAreaPage.waitForPageToLoad();
  expect(await secureAreaPage.isPageOpened()).toBe(true);
});

Then('the success message should be displayed', async function () {
  const testData = ConfigReader.getTestData();
  const secureAreaPage = new SecureAreaPage(this.browserWrapper.page);
  const message = await secureAreaPage.getMessageText();
  expect(message).toEqual(testData.loginSuccessMessage);
});

When('I click the logout button', async function () {
  const secureAreaPage = new SecureAreaPage(this.browserWrapper.page);
  await secureAreaPage.clickLogoutButton();
});

Then('the Login page should be open', async function () {
  const loginPage = new LoginPage(this.browserWrapper.page);
  await loginPage.waitForPageToLoad();
  expect(await loginPage.isPageOpened()).toBe(true);
});
