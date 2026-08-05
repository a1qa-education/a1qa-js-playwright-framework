import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import SecureAreaPage from '../pages/SecureAreaPage.js';
import ConfigReader from '#framework/utils/ConfigReader.js';

Then('the success message is displayed', async function () {
  const testData = ConfigReader.getTestData();
  const secureAreaPage = this.getPage(SecureAreaPage);
  await secureAreaPage.waitForPageToLoad();
  expect(await secureAreaPage.isPageOpened()).toBe(true);
  
  const message = await secureAreaPage.getMessageText();
  expect(message).toEqual(testData.loginSuccessMessage);
});

When('I log out', async function () {
  const secureAreaPage = this.getPage(SecureAreaPage);
  await secureAreaPage.clickLogoutButton();
});
