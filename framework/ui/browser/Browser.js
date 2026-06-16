import path from 'path';
import ConfigReader from '#framework/utils/ConfigReader.js';

export default class Browser {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} downloadDir - Isolated directory for downloads
   */
  constructor(page, downloadDir) {
    this._page = page;
    this._pages = [page];
    this._currentPage = page;
    this._downloadDir = downloadDir;

    page.context().on('page', (newPage) => {
      if (!this._pages.includes(newPage)) {
        this._pages.push(newPage);
      }
    });

    page.context().on('page', (newPage) => {
      newPage.on('close', () => {
        this._pages = this._pages.filter(p => p !== newPage);
      });
    });
  }

  get page() {
    return this._page;
  }

  async openUrl(url) {
    await this._page.goto(url);
  }

  async getCurrentUrl() {
    return this._page.url();
  }

  async refresh() {
    await this._page.reload();
  }

  async navigateBack() {
    await this._page.goBack();
  }

  async navigateForward() {
    await this._page.goForward();
  }

  async acceptAlert(actionCallback) {
    const listener = async (dialog) => await dialog.accept();
    this._page.on('dialog', listener);

    try {
      await actionCallback();
    } finally {
      this._page.off('dialog', listener);
    }
  }

  async newTab(url) {
    const newPage = await this._page.context().newPage();
    this._currentPage = newPage;

    if (url) {
      await this.openUrl(url);
    }

    return newPage;
  }

  async switchToTab(index) {
    this._pages = this._pages.filter(p => !p.isClosed());

    if (index < 0 || index >= this._pages.length) {
      throw new Error(`Tab index ${index} is out of bounds. Open tabs: ${this._pages.length}`);
    }

    this._currentPage = this._pages[index];
    this._page = this._currentPage;

    await this._page.bringToFront();
  }

  async openLinkInNewTab(clickCallback) {
    const context = this._currentPage.context();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      clickCallback(),
    ]);

    await newPage.waitForLoadState();
    this._currentPage = newPage;
    this._page = newPage;
    return newPage;
  }

  async closeTab(index) {
    if (index < 0 || index >= this._pages.length) return;

    const pageToDelete = this._pages[index];

    if (!pageToDelete.isClosed()) {
      await pageToDelete.close();
    }

    if (this._currentPage === pageToDelete) {
      this._currentPage = this._pages[this._pages.length - 1] || null;
      this._page = this._currentPage;
    }
  }

  async getTabsCount() {
    return this._pages.filter(p => !p.isClosed()).length;
  }

  async downloadAndSave(action, fileName) {
    const settings = ConfigReader.getSettings();
    if (!settings.acceptDownloads) {
      throw new Error('Downloads are disabled. Set "acceptDownloads": true in settings.json to use downloadAndSave.');
    }

    const [download] = await Promise.all([
      this._page.waitForEvent('download'),
      action(),
    ]);

    const filePath = path.join(this._downloadDir, fileName);
    await download.saveAs(filePath);

    return filePath;
  }
}
