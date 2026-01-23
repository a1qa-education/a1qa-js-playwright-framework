import ElementType from '../constants/ElementType.js';
import ElementStateHandler from './helpers/elementState.js';

export default class BaseElement {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
    this._type = ElementType.ELEMENT;
  }

  get locator() {
    return this._locator;
  }

  get state() {
    return new ElementStateHandler(this._locator, this._name);
  }

  /**
   * Click on element
   * @returns {Promise<void>}
   */
  async click() {
    await this._locator.click();
  }

  /**
   * Get visible text from element
   * @returns {Promise<string>}
   */
  async getText() {
    return await this._locator.innerText();
  }
}
