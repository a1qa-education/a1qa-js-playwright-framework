import { step } from '#framework/utils/stepHelper.js';
import Timeouts from '../constants/Timeouts.js';
import BaseElement from '../elements/BaseElement.js';

export default class BasePage {
  /**
   * Initializes a BasePage with a unique element to identify it and a name for reporting.
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
   * Gets the name of the page.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Waits for the page to load by waiting for its unique element to be displayed, encapsulated within a reporting step.
   * @param {number} timeout
   * @returns {Promise<void>}
   */
  async waitForPageToLoad(timeout = Timeouts.WAIT_PAGE_LOAD) {
    await step(`Page '${this._name}' — Wait to load`, async () => {
      await this.uniqueElement.waitForDisplayed(timeout);
    });
  }

  /**
   * Checks if the page is opened using a fast non-blocking visibility check, encapsulated within a reporting step.
   * @returns {Promise<boolean>}
   */
  async isPageOpened() {
    return await step(`Page '${this._name}' — Check if opened`, async () => {
      return await this.uniqueElement.state.isVisible();
    });
  }
}
