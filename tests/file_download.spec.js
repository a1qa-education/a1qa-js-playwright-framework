// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import FileDownloadPage from './pages/FileDownloadPage.js';
import MainPage from './pages/MainPage.js';
import { testData } from '#framework/utils/ConfigReader.js';

test('Check that file downloaded', async ({ customBrowser: browser }) => {
  // Implement test case
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('File Download');

  const fileDownloadPage = new FileDownloadPage(browser.page);
  await fileDownloadPage.clickDownloadFile(testData.downloadFileName);
  expect(await fileDownloadPage.isFileLabelDisplayed(testData.downloadFileName)).toBe(true);


  const downloadedFilePath = await browser.downloadAndSave(
    () => fileDownloadPage.clickDownloadFile(testData.downloadFileName),
    testData.downloadFileName);
  expect(browser.fileExists(downloadedFilePath)).toBe(true);
});
