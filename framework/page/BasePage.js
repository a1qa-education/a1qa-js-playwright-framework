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
}
