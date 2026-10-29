import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';

const expectedTimerValue = '00:00:00';
const timerDisplayTimeout = 700;

test('Check timer initial value', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await browser.page.waitForTimeout(timerDisplayTimeout);
  expect(await mainPage.getTimerText()).toBe(expectedTimerValue);
});
