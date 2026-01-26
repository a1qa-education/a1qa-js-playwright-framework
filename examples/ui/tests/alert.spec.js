// @ts-check
import Browser from '../../../framework/ui/browser/Browser.js';
import { test, expect } from '../../../framework/ui/fixtures/browser.fixture.js';
import FramesPage from '../pages/FramesPage.js';
import JavaScriptAlertsPage from '../pages/JavaScriptAlertsPage.js';
import MainPage from '../pages/MainPage.js';
import MultipleWindowsPage from '../pages/MultipleWindowsPage.js';
import NestedFramesPage from '../pages/NestedFramesPage.js';
import NewWindowPage from '../pages/NewWindowPage.js';

const successfulMessage = 'You successfully clicked an alert';

test.beforeEach(
  /**
   * @param {{ browser: Browser }} fixtures
   */
  async ( { browser }) => {
  await browser.openUrl('https://the-internet.herokuapp.com');
});

test(
    'demo test for alerts, new tabs and frames', 
  /**
  * @param {{ browser: Browser }} fixtures
  */
  async ({ browser }) => {
  const mainPage = new MainPage(browser.page);
  //JS Alerts
  await mainPage.clickNavigationLink('JavaScript Alerts');

  const javaScriptAlertsPage = new JavaScriptAlertsPage(browser.page);
  expect(await javaScriptAlertsPage.isPageOpened()).toBe(true);
  await browser.acceptAlert(()=> javaScriptAlertsPage.clickForJSAlertButton());
  expect(await javaScriptAlertsPage.getResultText()).toBe(successfulMessage);
  
  await browser.navigateBack();
  await mainPage.waitForPageToLoad();
  expect(await mainPage.isPageOpened()).toBe(true);
  
  //New tab handling
  mainPage.clickNavigationLink("Multiple Windows");
  const multipleWindowsPage = new MultipleWindowsPage(browser.page);

  await browser.openLinkInNewTab(() => multipleWindowsPage.clickNewWindowBtn());
  await browser.switchToTab(1);
  const newWindowPage = new NewWindowPage(browser.page);
  expect (await newWindowPage.isNewWindowLblDisplayed()).toBe(true);
  await browser.closeTab(1);

  //Frames handling
  await browser.openUrl('https://the-internet.herokuapp.com');
  await mainPage.clickNavigationLink("Frames");
  const framesPage = new FramesPage(browser.page);
  await framesPage.clickNestedFramesBtn();

  const nestedFramesPage = new NestedFramesPage(browser.page);
  const middleText = await nestedFramesPage.getMiddleFrameText();
  expect(middleText).toBe('MIDDLE');

  const leftText = await nestedFramesPage.getLeftFrameText();
  expect(leftText).toContain('LEFT');}
);
