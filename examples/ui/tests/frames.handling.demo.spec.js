// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import FramesPage from '../pages/FramesPage.js';
import MainPage from '../pages/MainPage.js';
import NestedFramesPage from '../pages/NestedFramesPage.js';

test('frames handling demo test', 
  async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);

  await mainPage.clickNavigationLink("Frames");
  const framesPage = new FramesPage(browser.page);
  await framesPage.clickNestedFramesBtn();

  const nestedFramesPage = new NestedFramesPage(browser.page);
  const middleText = await nestedFramesPage.getMiddleFrameText();
  expect(middleText).toBe('MIDDLE');

  const leftText = await nestedFramesPage.getLeftFrameText();
  expect(leftText).toContain('LEFT');}
);
