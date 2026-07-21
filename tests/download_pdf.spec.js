// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import FileUtils from '#framework/utils/FileUtils.js';
import ArticlePage from './pages/ArticlePage';
import DownloadAsPdfPage from './pages/DownloadAsPdfPage';
import WikipediaMainPage from './pages/WikipediaMainPage';

test('Download PDF', async ({customBrowser: browser}) => {
  const mainPage = new WikipediaMainPage(browser.page);
  await mainPage.selectEnglishLanguage();
  await mainPage.typeSearchRequest('Albert Einstein');
  await mainPage.searchClick();

  const articlePage = new ArticlePage(browser.page);
  await articlePage.clickToolsMenuButton();
  await articlePage.clickDownloadAsPdfButton();

  const downloadAsPdfPage = new DownloadAsPdfPage(browser.page)
  const fileName = await downloadAsPdfPage.getFileName();
  const filePath = await browser.downloadAndSave(
    () => browser.page.locator('//button[@class="oo-ui-inputWidget-input oo-ui-buttonElement-button"]').click(),
    fileName
  );
  expect( await FileUtils.isFileExists(filePath)).toBe(true);
});
