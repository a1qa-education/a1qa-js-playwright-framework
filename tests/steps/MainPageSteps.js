import { Given, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import MainPage from '../pages/MainPage.js';

Given('the main page is open', async function () {
    const mainPage = this.getPage(MainPage);
    expect(await mainPage.isPageOpened()).toBe(true);
});

When('I navigate to the {string} page', async function (linkName) {
    const mainPage = this.getPage(MainPage);
    await mainPage.clickNavigationLink(linkName);
});
