// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import TablesPage from './pages/TablesPage.js';

const expectedSum = 251;
const currencySign = '$';

test('Sum of Due values should be correct', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('Sortable Data Tables');

  const tablesPage = new TablesPage(browser.page);
  await tablesPage.waitForPageToLoad();
  const dueValues = await tablesPage.getDueColumnValues();

  // Calculate sum of elements (actualSum) from dueValues
  let actualSum = 0;
  for (const itemText of dueValues) {
    actualSum += +itemText.replace(currencySign, '').trim();
  }

  expect(actualSum).toEqual(expectedSum);
});
