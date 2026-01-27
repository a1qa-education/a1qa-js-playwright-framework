// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from '../pages/MainPage.js';
import MultipleWindowsPage from '../pages/MultipleWindowsPage.js';
import NewWindowPage from '../pages/NewWindowPage.js';

test('demo test for handling tabs', 
  async ({ browser }) => {
  const mainPage = new MainPage(browser.page);
  
  mainPage.clickNavigationLink("Multiple Windows");
  const multipleWindowsPage = new MultipleWindowsPage(browser.page);

  await browser.openLinkInNewTab(() => multipleWindowsPage.clickNewWindowBtn());
  await browser.switchToTab(1);
  const newWindowPage = new NewWindowPage(browser.page);
  expect (await newWindowPage.isNewWindowLblDisplayed()).toBe(true);
  await browser.closeTab(1);
}
);
