// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import WikiMainPage from './pages/WikiMainPage.js';
import ArticlePage from './pages/ArticlePage.js';
import DownloadPdfPage from './pages/DownloadPdfPage.js';

test('Download PDF from Wikipedia', async ({ customBrowser: browser }) => {
    const wikiMainPage = new WikiMainPage(browser.page);
    expect(await wikiMainPage.isPageOpened()).toBe(true);

    await wikiMainPage.selectLanguage('en');
    await wikiMainPage.searchFor('Albert Einstein');

    const articlePage = new ArticlePage(browser.page);
    expect(await articlePage.isPageOpened()).toBe(true);

    await articlePage.clickToolsMenu();
    await articlePage.clickDownloadAsPdf();

    const downloadPdfPage = new DownloadPdfPage(browser.page);
    expect(await downloadPdfPage.isPageOpened()).toBe(true);

    const fileName = await downloadPdfPage.getFileName();

    const downloadedFilePath = await browser.downloadAndSave(
        () => downloadPdfPage.clickDownload(),
        fileName
    );

    expect(browser.fileExists(downloadedFilePath)).toBe(true);

    browser.deleteFile(downloadedFilePath);
    expect(browser.fileExists(downloadedFilePath)).toBe(false);
});