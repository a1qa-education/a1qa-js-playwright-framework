import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';

const expectedTimerValue = '00:00:00';
const timerDisplayTimeout = 675;

test('Check timer initial value', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.waitForPageToLoad();
  expect(await mainPage.isPageOpened()).toBe(true);
  await browser.page.waitForTimeout(timerDisplayTimeout);
  expect(await mainPage.getTimerText()).toBe(expectedTimerValue);
});
