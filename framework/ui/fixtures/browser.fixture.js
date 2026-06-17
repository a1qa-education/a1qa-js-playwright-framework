import { test as base, expect } from '@playwright/test';
import Browser from '../browser/Browser.js';
import fs from 'fs/promises';
import path from 'path';
import EnvProvider from '../../utils/EnvProvider.js';

/**
 * @typedef {Object} CustomFixtures
 * @property {Browser} customBrowser
 */

/**
 * @typedef {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & CustomFixtures>} CustomTestType
 */

/**
 * Base custom test fixture providing an isolated Browser wrapper instance.
 * Inherits native Playwright configuration (e.g., viewport, video, acceptDownloads).
 * * @type {CustomTestType}
 */
export const test = base.extend({
  customBrowser: async ({ page, baseURL }, use, testInfo) => {
    const workerDownloadDir = path.join(testInfo.outputDir, 'downloads');

    await fs.mkdir(workerDownloadDir, { recursive: true });

    const myBrowser = new Browser(page, workerDownloadDir);

    if (baseURL) {
      await myBrowser.openUrl(baseURL);
    }

    await use(myBrowser);

    // Retain download artifacts for failed tests to aid debugging
    if (testInfo.status === 'passed') {
      await fs.rm(workerDownloadDir, { recursive: true, force: true }).catch(() => {});
    }
  },
});

/**
 * Extended test fixture that pre-configures Basic Authentication for the context.
 * @type {CustomTestType}
 */
export const testWithAuth = test.extend({
  httpCredentials: [
    async ({}, use) => {
      await use({
        username: EnvProvider.basicAuthUser,
        password: EnvProvider.basicAuthPassword,
      });
    },
    { option: true }
  ]
});

export { expect };
