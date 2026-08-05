import Logger from '#framework/utils/Logger.js';
import Timeouts from '../constants/Timeouts.js';
import ElementStateHandler from './helpers/elementState.js';

export default class BaseElement {
  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {string} name
   */
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
    this._type = 'Element';
  }

  get locator() {
    return this._locator;
  }

  get state() {
    return new ElementStateHandler(this.locator, this._name);
  }

  /**
   * Executes a click action encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async click() {
    await Logger.step(`${this._type} '${this._name}' — Click`, async () => {
      await this.locator.click();
    });
  }

  /**
   * Retrieves the inner text of the element encapsulated within a reporting step.
   * @returns {Promise<string>}
   */
  async getText() {
    return await Logger.step(`${this._type} '${this._name}' — Get text`, async () => {
      await this.waitForDisplayed();
      return await this.locator.innerText();
    });
  }

  /**
   * Moves the mouse cursor over the element encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async moveTo() {
    await Logger.step(`${this._type} '${this._name}' — Hover`, async () => {
      await this.locator.hover();
    });
  }

  /**
   * Waits for the element to become visible encapsulated within a reporting step.
   * @param {number} timeout
   * @returns {Promise<void>}
   */
  async waitForDisplayed(timeout = Timeouts.EXPLICIT_WAIT) {
    await Logger.step(`${this._type} '${this._name}' — Wait for element to be displayed`, async () => {
      await this.locator.waitFor({ state: 'visible', timeout });
    });
  }
}
