import { test as base, expect } from '@playwright/test';
import Browser from '../browser/Browser.js';

/**
 * @typedef {import('@playwright/test').TestFixtures} TestFixtures
 * @typedef {{ browser: Browser }} BrowserFixtures
 */

/** @type {import('@playwright/test').TestType<BrowserFixtures & TestFixtures>} */
export const test = base.extend({
  browser: async ({ browser: pwBrowser }, use) => {
    const context = await pwBrowser.newContext();
    const page = await context.newPage();

    await use(new Browser(page));

    await context.close();
  },
});

export { expect };
