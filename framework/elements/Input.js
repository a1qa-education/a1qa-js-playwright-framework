import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class Input extends BaseElement {
  constructor(page, locator, name) {
    super(page, locator, name);
    this._type = ElementType.INPUT;
  }

  /**
   * Type text into element
   * @param {string} text - Text to type
   * @returns {Promise<void>}
   */
  async typeText(text) {
    await this._locator.fill(text);
  }

  /**
   * Get value of the input element
   * @returns {Promise<string>} Value from element
   */
  async getValue() {
    return await this._locator.inputValue();
  }
}
