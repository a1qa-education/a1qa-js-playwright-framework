import { Given } from '@cucumber/cucumber';
import MainPage from '../pages/MainPage.js';

Given('I open the {string} page', async function (linkName) {
    const mainPage = new MainPage(this.browserWrapper.page);
    await mainPage.clickNavigationLink(linkName);
});
