import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import WelcomePage from './pages/WelcomePage.js';

const expectedTimerValue = '00:00:00';

test('timer test', async ({ customBrowser: browser }) => {
  const welcomePage = new WelcomePage(browser.page);
  await welcomePage.clickHereToGoLink();

  const mainPage = new MainPage(browser.page);
  expect(await mainPage.getTimerText()).toBe(expectedTimerValue);
});
