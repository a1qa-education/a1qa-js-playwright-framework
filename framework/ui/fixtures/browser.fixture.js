import { test as base, expect } from '@playwright/test';
import Browser from '../browser/Browser.js';
import { settings, testData } from '../../utils/ConfigReader.js';

/**
 * Helper function to create a browser fixture with optional context options
 * @param {object} contextOptions - Options to pass to browser.newContext()
 * @returns {Function} Fixture function
 */
function createBrowserFixture(contextOptions = {}) {
  return async ({ browser }, use) => {
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    const myBrowser = new Browser(page);

    if (settings.baseUrl) {
      await myBrowser.openUrl(settings.baseUrl);
    }
    await use(myBrowser);
    await context.close();
  };
}

/**
 * @type {import('@playwright/test').TestType<{ customBrowser: Browser }>} 
 */
export const test = base.extend({
  customBrowser: createBrowserFixture(),
});

export const testWithAuth = base.extend({
  customBrowser: createBrowserFixture({
    httpCredentials: testData.basicAuthCredentials
  }),
});

export { expect };
