// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import FramesPage from './pages/FramePages/FramesPage.js';
import NestedFramesPage from './pages/FramePages/NestedFramesPage.js';
import MainPage from './pages/MainPage.js';

const leftFrameText = 'LEFT';
const rightFrameText = 'RIGHT';

test('interact with text in Nested Frame', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('Frames');

  const framesPage = new FramesPage(browser.page);
  await framesPage.clickNestedFramesButton();

  const nestedFramesPage = new NestedFramesPage(browser.page);

  // Implement checks for left and right frame text

});
