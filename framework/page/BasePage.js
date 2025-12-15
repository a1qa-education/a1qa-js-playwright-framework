export default class BasePage {
  constructor(page, uniqueSelector, name) {
    this._page = page;
    this._uniqueLocator = page.locator(uniqueSelector);
    this._name = name;
  }

  /**
   * Get name of the page
   * @returns {string} Name of the page
   */
  get name() {
    return this._name;
  }

  /**
   * Wait for page to load
   * @returns {Promise<void>}
   */
  async waitForPageToLoad() {
    await this._uniqueLocator.waitFor({ state: 'visible' });
  }

  /**
   * Check if the page is opened
   * @returns {Promise<boolean>}
   */
  async isPageOpened() {
    try {
      await this.waitForPageToLoad();
      return true;
    } catch (e) {
      return false;
    }
  }
}
