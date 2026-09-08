import { test } from '@playwright/test';
import ElementType from '../constants/ElementType.js';
import BaseElement from './BaseElement.js';

export class TextBox extends BaseElement {
  /**
   * Initializes a TextBox element with a specific locator and name for reporting.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} name
   */
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.TEXT_BOX;
  }

  /**
   * Types text into the element character by character, simulating real keyboard input.
   * Useful for inputs with real-time validation, autocomplete, debounced search, or character masks.
   * @param {string} text - Text to type
   * @returns {Promise<void>}
   */
  async typeText(text) {
    await test.step(`${this._type} '${this._name}' — Type text: "${text}"`, async () => {
      await this.locator.pressSequentially(text);
    });
  }

  /**
   * Sets the value of the input element programmatically (equivalent to pasting).
   * Faster than typeText(), but does not trigger per-character keyboard events.
   * @param {string} text - Text to set
   * @returns {Promise<void>}
   */
  async setText(text) {
    await test.step(`${this._type} '${this._name}' — Set text: "${text}"`, async () => {
      await this.locator.fill(text);
    });
  }

  /**
   * Gets the value of the input element, encapsulated within a reporting step.
   * @returns {Promise<string>} Value from element
   */
  async getValue() {
    return await test.step(`${this._type} '${this._name}' — Get value`, async () => {
      return await this.locator.inputValue();
    });
  }
}
