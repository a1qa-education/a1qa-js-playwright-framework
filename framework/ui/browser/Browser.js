export default class Browser {
  constructor(page) {
    this._page = page;
    this._pages = [page];
    this._currentPage = page;

    page.context().on('page', (newPage) => {
      this._pages.push(newPage);
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

  async refresh(){
    await this._page.refresh();
  }

  async navigateBack() {
    await this._page.goBack();
  }
  
  async navigateForward() {
    await this._page.goForward();
  }

  /**
   * Accept an alert triggered by a callback action
   */
  async acceptAlert(actionCallback) {
    const listener = async dialog => {
      await dialog.accept();
      this._page.off('dialog', listener);
    };

    this._page.on('dialog', listener);
    await actionCallback();
  }

  async newTab(url) {
    const newPage = await this._currentPage.context().newPage();
    this._pages.push(newPage);
    this._currentPage = newPage;
    if (url) await newPage.goto(url);
    return newPage;
  }

  async switchToTab(index) {
    if (index < 0 || index >= this._pages.length) {
      throw new Error(`Tab index ${index} is out of bounds`);
    }
    this._currentPage = this._pages[index];
  }

  /**
   * Open a new tab triggered by a callback action
   */
  async openLinkInNewTab(clickCallback) {
    const context = this._currentPage.context();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      clickCallback(),
    ]);

    this._pages.push(newPage);
    this._currentPage = newPage;
    return newPage;
  }

  async closeTab(index) {
    const page = this._pages[index];
    if (page) {
      await page.close();
      this._pages.splice(index, 1);
      if (this._currentPage === page) this._currentPage = this._pages[0];
    }
  }

  async getTabsCount() {
    return this._pages.length;
  }
}
