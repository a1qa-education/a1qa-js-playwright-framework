import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class Checkbox extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.CHECKBOX;
  }

  /**
   * Ensure that checkbox is checked
   * @returns {Promise<void>}
   */
  async check() {
    this._locator.check();
  }

  /**
   * Ensure that checkbox is unchecked
   * @returns {Promise<void>}
   */
  async uncheck() {
    this._locator.uncheck();
  }
}
