import path from 'path';
import { test } from '@playwright/test';

export default class Browser {
  /**
   * Initializes the Browser wrapper and tracks open tabs.
   * @param {import('@playwright/test').Page} page
   * @param {string} downloadDir - Isolated directory for downloads
   */
  constructor(page, downloadDir) {
    this._page = page;
    this._pages = [page];
    this._page.on('close', () => { this._pages = this._pages.filter(p => p !== this._page); });
    this._downloadDir = downloadDir;

    // Subscribe to the 'page' event to track newly opened tabs
    page.context().on('page', (newPage) => {
      if (!this._pages.includes(newPage)) {
        this._pages.push(newPage);
      }

      // Subscribe to the 'close' event to remove the tab from the tracking array
      newPage.on('close', () => {
        this._pages = this._pages.filter(p => p !== newPage);
      });
    });
  }

  /**
   * Gets the currently active Playwright Page instance.
   * @returns {import('@playwright/test').Page}
   */
  get page() {
    return this._page;
  }

  /**
   * Navigates to the specified URL, encapsulated within a reporting step.
   * @param {string} url
   * @returns {Promise<void>}
   */
  async openUrl(url) {
    await test.step(`Browser — Open URL: "${url}"`, async () => {
      await this._page.goto(url);
    });
  }

  /**
   * Retrieves the current URL of the active tab, encapsulated within a reporting step.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await test.step('Browser — Get current URL', async () => {
      return this._page.url();
    });
  }

  /**
   * Reloads the current page, encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async refresh() {
    await test.step('Browser — Refresh page', async () => {
      await this._page.reload();
    });
  }

  /**
   * Navigates to the previous page in history, encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async navigateBack() {
    await test.step('Browser — Navigate back', async () => {
      await this._page.goBack();
    });
  }

  /**
   * Navigates to the next page in history, encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async navigateForward() {
    await test.step('Browser — Navigate forward', async () => {
      await this._page.goForward();
    });
  }

  /**
   * Accepts an alert dialog triggered by the provided action, encapsulated within a reporting step.
   * @param {Function} actionCallback - Action that triggers the alert
   * @returns {Promise<void>}
   */
  async acceptAlert(actionCallback) {
    await test.step('Browser — Accept alert dialog', async () => {
      const [dialog] = await Promise.all([
        this._page.waitForEvent('dialog'),
        actionCallback(),
      ]);
      await dialog.accept();
    });
  }

  /**
   * Opens a new tab and optionally navigates to a URL, encapsulated within a reporting step.
   * @param {string} [url] - Optional URL to navigate to after opening the tab
   * @returns {Promise<import('@playwright/test').Page>}
   */
  async newTab(url) {
    return await test.step(url ? `Browser — Open new tab and navigate to: "${url}"` : 'Browser — Open new tab', async () => {
      const newPage = await this._page.context().newPage();

      // Explicitly add to tracking in case the context 'page' event hasn't fired yet
      if (!this._pages.includes(newPage)) {
        this._pages.push(newPage);
      }

      // Update the active page reference immediately
      this._page = newPage;

      if (url) {
        await this.openUrl(url);
      }

      return newPage;
    });
  }

  /**
   * Switches focus to the tab at the specified index, encapsulated within a reporting step.
   * @param {number} index
   * @returns {Promise<void>}
   */
  async switchToTab(index) {
    await test.step(`Browser — Switch to tab index [${index}]`, async () => {
      this._pages = this._pages.filter(p => !p.isClosed());

      if (index < 0 || index >= this._pages.length) {
        throw new Error(`Tab index ${index} is out of bounds. Open tabs: ${this._pages.length}`);
      }

      // Update the single source of truth for the active page
      this._page = this._pages[index];
      await this._page.bringToFront();
    });
  }

  /**
   * Clicks a link that opens a new tab and waits for it to load, encapsulated within a reporting step.
   * @param {Function} clickCallback - Action that triggers the new tab
   * @returns {Promise<import('@playwright/test').Page>}
   */
  async openLinkInNewTab(clickCallback) {
    return await test.step('Browser — Open link in new tab', async () => {
      const context = this._page.context();
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        clickCallback(),
      ]);

      await newPage.waitForLoadState();

      // Update the single source of truth for the active page
      this._page = newPage;
      return newPage;
    });
  }

  /**
   * Closes the tab at the specified index, encapsulated within a reporting step.
   * @param {number} index
   * @returns {Promise<void>}
   */
  async closeTab(index) {
    await test.step(`Browser — Close tab index [${index}]`, async () => {
      if (index < 0 || index >= this._pages.length) {
        throw new Error(`Tab index ${index} is out of bounds. Open tabs: ${this._pages.length}`);
      }

      const pageToDelete = this._pages[index];
      if (!pageToDelete.isClosed()) await pageToDelete.close();

      this._pages = this._pages.filter(p => !p.isClosed());
      if (this._page?.isClosed()) {
        this._page = this._pages.at(-1) ?? null;
      }
    });
  }

  /**
   * Returns the count of currently open tabs, encapsulated within a reporting step.
   * @returns {Promise<number>}
   */
  async getTabsCount() {
    return await test.step('Browser — Get tabs count', async () => {
      return this._pages.filter(p => !p.isClosed()).length;
    });
  }

  /**
   * Waits for a download event triggered by the action and saves the file, encapsulated within a reporting step.
   * @param {Function} action - Action that triggers the download
   * @param {string} fileName - Name of the file to save
   * @returns {Promise<string>}
   */
  async downloadAndSave(action, fileName) {
    return await test.step(`Browser — Download and save file: "${fileName}"`, async () => {
      const [download] = await Promise.all([
        this._page.waitForEvent('download'),
        action(),
      ]);

      const filePath = path.join(this._downloadDir, fileName);
      await download.saveAs(filePath);

      return filePath;
    });
  }
}
