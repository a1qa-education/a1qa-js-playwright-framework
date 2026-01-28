import Timeouts from "../constants/Timeouts.js";
import BaseElement from "../elements/BaseElement.js";

export default class BasePage {
   /**
   * @param {BaseElement} uniqueElement - A unique element that identifies the page
   * @param {string} name - Name of the page for logging/reporting
   */
  constructor(uniqueElement, name) {
    if (!(uniqueElement instanceof BaseElement)) {
      throw new Error('uniqueElement must be a child of BaseElement');
    }
    this.uniqueElement = uniqueElement;
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
  async waitForPageToLoad(timeout = Timeouts.WAIT_PAGE_LOAD) {    
    await this.uniqueElement.waitForDisplayed(timeout);
  }

  /**
   * Check if the page is opened
   * @returns {Promise<boolean>}
   */
  async isPageOpened() {
    try {
      return this.uniqueElement.state.isPresent();
    } catch {
      return false;
    }
  }
}
