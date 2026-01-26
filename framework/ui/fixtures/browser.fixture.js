import { test as base, expect } from '@playwright/test';
import Browser from '../browser/Browser.js';
import { settings, testData } from '../../utils/ConfigReader.js';

/** @type {import('@playwright/test').TestType<{ browser: Browser }>} */
export const test = base.extend({
  browser: async ({ browser: pwBrowser }, use, testInfo) => {
    const context = await pwBrowser.newContext();
    const page = await context.newPage();
    const myBrowser = new Browser(page);
    
    await myBrowser.openUrl(settings.baseUrl);
    await use(myBrowser);
    await context.close();
  },
});

export { expect };
