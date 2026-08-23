import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import WorldClockPage from '../pages/WorldClockPage.js';

Given('I navigate to the page {string}', async function (url) {
    await this.browserWrapper.openUrl(url);
});

Then('I press the link with name {string}', async function (name) {
    const worldClockPage = this.getPage(WorldClockPage);
    await worldClockPage.personalWorldClockButton(name).click();
});

When('I verify the modal with title {string} is opened', async function (title) {
    const worldClockPage = this.getPage(WorldClockPage);
    await worldClockPage.isModalOpened(title);
});

When('I enter {string} into the input with id {string}', async function (text, id) {
    const worldClockPage = this.getPage(WorldClockPage);
    await worldClockPage.modalTextbox(id).typeText(text);
});

When('I wait {int} seconds until the suggestion list is shown', async function (seconds) {
    const worldClockPage = this.getPage(WorldClockPage);
    await worldClockPage.waitForSuggestionsDisplayed(seconds * 1000)
})

When('I click suggestion number {int} in dropdown', async function (number) {
    const worldClockPage = this.getPage(WorldClockPage);
    await worldClockPage.clickSuggestionItem(number);
});

Then('I press the modal button with text {string}', async function (text) {
    const worldClockPage = this.getPage(WorldClockPage);
    await worldClockPage.clickModalButton(text);
});

When('word {string} is displayed', async function (word) {
    const worldClockPage = this.getPage(WorldClockPage);
    expect(await worldClockPage.cityNameLabel(word).state.isDisplayed()).toBeTruthy();
})
