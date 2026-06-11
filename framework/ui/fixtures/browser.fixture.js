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
  // testInfo parameter to access test-specific data
  return async ({ browser }, use, testInfo) => {
    // Lazy load settings when the test actually starts
    const settings = ConfigReader.getSettings();
    const contextOptions = getContextOptions();

    // Isolate downloads per test to prevent race conditions in parallel execution
    const workerDownloadDir = path.join(testInfo.outputDir, 'downloads');
    fs.mkdirSync(workerDownloadDir, { recursive: true });

    const context = await browser.newContext({
      acceptDownloads: true,
      ...contextOptions,
    });
    
    const page = await context.newPage();
    
    const myBrowser = new Browser(page, workerDownloadDir);

    if (settings.baseUrl) {
      await myBrowser.openUrl(settings.baseUrl);
    }
    
    // Pass the browser instance to the test
    await use(myBrowser);
    
    await context.close();
    
    // Teardown: unconditionally delete the isolated download directory after the test.
    if (fs.existsSync(workerDownloadDir)) {
      fs.rmSync(workerDownloadDir, { recursive: true, force: true });
    }
  };
}

/**
 * @typedef {Object} CustomFixtures
 * @property {Browser} customBrowser
 */

/**
 * @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & CustomFixtures>}
 */
export const test = base.extend({
  customBrowser: createBrowserFixture(),
});

/**
 * @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & CustomFixtures>}
 */
export const testWithAuth = base.extend({
  customBrowser: createBrowserFixture(() => ({
    httpCredentials: ConfigReader.getTestData().basicAuthCredentials
  })),
});

export { expect };
