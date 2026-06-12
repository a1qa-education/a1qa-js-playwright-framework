import { test as base, expect } from '@playwright/test';
import Browser from '../browser/Browser.js';
import ConfigReader from '../../utils/ConfigReader.js';
import path from 'path';
import fs from 'fs';

/**
 * Helper function to create a browser fixture with optional context options.
 * Uses a callback for contextOptions to enable lazy loading of configuration data.
 * 
 * @param {Function} getContextOptions - Function returning options to pass to browser.newContext()
 * @returns {Function} Fixture function
 */
function createBrowserFixture(getContextOptions = () => ({})) {
  return async ({ browser }, use, testInfo) => {
    const settings = ConfigReader.getSettings();
    const contextOptions = getContextOptions();

    const workerDownloadDir = path.join(testInfo.outputDir, 'downloads');
    
    // Optimize I/O: Only create the directory if downloads are explicitly enabled in settings
    if (settings.acceptDownloads) {
      fs.mkdirSync(workerDownloadDir, { recursive: true });
    }

    const context = await browser.newContext({
      // Extract to settings so contexts without download needs don't pay the overhead cost
      acceptDownloads: settings.acceptDownloads || false,
      ...contextOptions,
    });
    
    const page = await context.newPage();
    
    const myBrowser = new Browser(page, workerDownloadDir);

    if (settings.baseUrl) {
      await myBrowser.openUrl(settings.baseUrl);
    }
    
    await use(myBrowser);
    
    await context.close();
    
    // Teardown: optimize I/O by only attempting deletion if downloads were enabled
    if (settings.acceptDownloads && fs.existsSync(workerDownloadDir)) {
      fs.rmSync(workerDownloadDir, { recursive: true, force: true });
    }
  };
}

/**
 * Define the shape of our custom fixtures.
 * @typedef {Object} CustomFixtures
 * @property {Browser} customBrowser
 */

/**
 * Combine Playwright's base arguments with our custom fixtures so IntelliSense works everywhere.
 * @typedef {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & CustomFixtures>} CustomTestType
 */

/**
 * @type {CustomTestType}
 */
export const test = base.extend({
  customBrowser: createBrowserFixture(),
});

/**
 * @type {CustomTestType}
 */
export const testWithAuth = base.extend({
  customBrowser: createBrowserFixture(() => ({
    httpCredentials: ConfigReader.getTestData().basicAuthCredentials
  })),
});

export { expect };
