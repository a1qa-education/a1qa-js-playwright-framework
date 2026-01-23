import Timeouts from "../constants/Timeouts.js";

export default class BasePage {
  constructor(uniqueLocator, name) {
    this._uniqueLocator = uniqueLocator;
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
    await this._uniqueLocator.waitFor({
      state: 'visible',
      timeout: Timeouts.WAIT_PAGE_LOAD, 
    });
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
