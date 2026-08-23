import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import MainPage from '../pages/MainPage.js';
import WeatherPage from '../pages/WeatherPage.js';
import CityWeatherPage from '../pages/CityWeatherPage.js';

Given('I open the url {string}', async function (url) {
    await this.browserWrapper.openUrl(url);
});

Then('I click the link with text {string}', async function (text) {
    const mainPage = this.getPage(MainPage);
    mainPage.clickNavigationLink(text);
});

When('I verify the page title contains {string}', async function (text) {
    const weatherPage = this.getPage(WeatherPage);
    weatherPage.waitForPageToLoad();
    weatherPage.checkPageTitle(text);
});

When('I type {string} into the input', async function (text) {
    const weatherPage = this.getPage(WeatherPage);
    weatherPage.searchInput.typeText(text)
});

Given('I wait {int} seconds for the dropdown to appear', async function (seconds) {
    const weatherPage = this.getPage(WeatherPage);
    await weatherPage.waitForDropdownApear(seconds * 1000)
})

When('I click element number {int} in the list', async function (number) {
    const weatherPage = this.getPage(WeatherPage);
    weatherPage.clickElementByNumber(number)
});

When('the text of element contains {string}', async function (expected) {
    const cityWeatherPage = this.getPage(CityWeatherPage);
    expect(await cityWeatherPage.getPageHeaderText()).toContain(expected)
});
