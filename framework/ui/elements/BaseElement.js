import { test } from '@playwright/test';
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
    await test.step(`${this._type} '${this._name}' — Click`, async () => {
      await this.locator.click();
    });
  }

  /**
   * Retrieves the inner text of the element encapsulated within a reporting step.
   * @returns {Promise<string>}
   */
  async getText() {
    return await test.step(`${this._type} '${this._name}' — Get text`, async () => {
      await this.waitForDisplayed();
      return await this.locator.innerText();
    });
  }

  /**
   * Retrieves the computed value of a CSS property of the element, encapsulated within a reporting step.
   * @param {string} propertyName - Name of the CSS property, e.g. 'height'
   * @returns {Promise<string>} The computed value, e.g. '228px'
   */
  async getCssProperty(propertyName) {
    return await test.step(`${this._type} '${this._name}' — Get CSS property '${propertyName}'`, async () => {
      return await this.locator.evaluate(
        (element, property) => window.getComputedStyle(element).getPropertyValue(property),
        propertyName
      );
    });
  }

  /**
   * Moves the mouse cursor over the element encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async moveTo() {
    await test.step(`${this._type} '${this._name}' — Hover`, async () => {
      await this.locator.hover();
    });
  }

  /**
   * Waits for the element to become visible encapsulated within a reporting step.
   * @param {number} timeout
   * @returns {Promise<void>}
   */
  async waitForDisplayed(timeout = Timeouts.EXPLICIT_WAIT) {
    await test.step(`${this._type} '${this._name}' — Wait for element to be displayed`, async () => {
      await this.locator.waitFor({ state: 'visible', timeout });
    });
  }
}
