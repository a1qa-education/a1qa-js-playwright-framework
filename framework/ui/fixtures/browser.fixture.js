import { test as base, expect } from '@playwright/test';
import Browser from '../browser/Browser.js';
import { settings } from '../../utils/ConfigReader.js';
import path from 'path';
import fs from 'fs';

const DOWNLOAD_DIR = path.resolve(settings.downloadDir);

/**
 * @type {import('@playwright/test').TestType<{ customBrowser: Browser }>} 
 */
export const test = base.extend({
  customBrowser: async ({ browser }, use) => {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

    const context = await browser.newContext({
      acceptDownloads: true,
      downloadsPath: DOWNLOAD_DIR,
    });
    const page = await context.newPage();
    const myBrowser = new Browser(page);

    if (settings.baseUrl) {
      await myBrowser.openUrl(settings.baseUrl);
    }
    await use(myBrowser);
    await context.close();

    fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true });
  },
});

export { expect };
