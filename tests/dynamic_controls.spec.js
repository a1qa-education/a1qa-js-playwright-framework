// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import DynamicControlsPage from './pages/DynamicControlsPage.js';

const randomString = crypto.randomUUID();

test.beforeEach(async ({ customBrowser: browser }) => {
  await browser.openUrl('https://the-internet.herokuapp.com');
});

test('Check state of Dynamic control', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('Dynamic Controls');

  const dynamicControlsPage = new DynamicControlsPage(browser.page);

  await dynamicControlsPage.clickEnableButton(); 
  expect(await dynamicControlsPage.isInputFieldEnabled()).toBe(true);

  await dynamicControlsPage.inputTextIntoInputField(randomString);
  const text = await dynamicControlsPage.getValueFromInputField();
  expect(text).toEqual(randomString);
});
