import ElementType from '../constants/ElementType.js';

export default class BaseElement {
  constructor(page, selector, name) {
    this.page = page;
    this.locator = page.locator(selector);
    this.name = name;
    this.type = ElementType.ELEMENT;
  }

  /**
   * Click on element
   * @returns {Promise<void>}
   */
  async click() {
    await this.locator.click();
  }
}
