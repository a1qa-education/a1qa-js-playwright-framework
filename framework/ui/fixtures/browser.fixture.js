import { test as base, expect } from '@playwright/test';
import Browser from '../browser/Browser.js';
import { settings } from '../../utils/ConfigReader.js';

/**
 * @type {import('@playwright/test').TestType<{ customBrowser: Browser }>} 
 */
export const test = base.extend({
  customBrowser: async ({ browser }, use) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const myBrowser = new Browser(page);

    if (settings.baseUrl) {
        await myBrowser.openUrl(settings.baseUrl);
    }
    await use(myBrowser);
    await context.close();
  },
});

export { expect };
