import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class Input extends BaseElement {
  constructor(page, selector, name) {
    super(page, selector, name);
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
}
