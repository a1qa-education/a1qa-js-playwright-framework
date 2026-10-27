import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';

test('Dismiss cookies banner', async ({ customBrowser: browser }) => {
  const cookiesForm = new MainPage(browser.page).cookiesForm;
  await cookiesForm.clickAcceptCookiesButton();
  expect(await cookiesForm.isPageOpened()).toBe(false);
});
