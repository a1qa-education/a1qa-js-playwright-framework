import ElementType from '../constants/ElementType.js';

export default class BaseElement {
  constructor(page, selector, name) {
    this._page = page;
    this._locator = page.locator(selector);
    this._name = name;
    this._type = ElementType.ELEMENT;
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
