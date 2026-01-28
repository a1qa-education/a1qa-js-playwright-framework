import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class Dropdown extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.DROPDOWN;
  }

  /**
   * Selects option in <select>
   * @returns {Promise<Array<string>>}
   */
  async selectOption(option) {
    this._locator.selectOption(option);
  }
}
