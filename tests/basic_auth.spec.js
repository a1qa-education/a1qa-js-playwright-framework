import { testWithAuth, expect } from '#framework/ui/fixtures/browser.fixture.js';
import ConfigReader from '#framework/utils/ConfigReader.js';
import BasicAuth from './pages/BasicAuth';
import MainPage from './pages/MainPage';

testWithAuth('should perform Basic Auth action', async ({ customBrowser: browser }) => {
  const testData = ConfigReader.getTestData();
  const mainPage = new MainPage(browser.page);
  // Navigate to 'Basic Auth'

  const basicAuth = new BasicAuth(browser.page);
  // Verify that the success message is displayed

});
