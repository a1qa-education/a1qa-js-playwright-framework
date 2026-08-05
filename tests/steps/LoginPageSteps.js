import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import EnvProvider from '#framework/utils/EnvProvider.js';

When('I log in with valid credentials', async function () {
  const loginPage = this.getPage(LoginPage);
  await loginPage.waitForPageToLoad();
  await loginPage.typeUsername(EnvProvider.testUser);
  await loginPage.typePassword(EnvProvider.testPassword);
  await loginPage.clickLoginButton();
});

Then("the 'Form Authentication' page is open", async function () {
  const loginPage = this.getPage(LoginPage);
  await loginPage.waitForPageToLoad();
  expect(await loginPage.isPageOpened()).toBe(true);
});
