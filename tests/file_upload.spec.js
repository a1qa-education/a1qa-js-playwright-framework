// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import FileUploaderPage from './pages/FileUploaderPages/FileUploaderPage.js';
import { testData } from '#framework/utils/ConfigReader.js';
import UploadedFilesPage from './pages/FileUploaderPages/UploadedFilesPage.js';

const fileName = 'test.txt';

// Implement test block 

test('File upload test', async ({ customBrowser: browser }) => {
    const mainPage = new MainPage(browser.page);
    await mainPage.clickNavigationLink('File Upload');

    const fileUploaderPage = new FileUploaderPage(browser.page);
    await fileUploaderPage.uploadFile(testData.fileForUpload);

    const uploadedFilesPage = new UploadedFilesPage(browser.page);
    const uploadedFileName = await uploadedFilesPage.getUploadedFileName();
    expect(uploadedFileName).toEqual(fileName);
}); 
