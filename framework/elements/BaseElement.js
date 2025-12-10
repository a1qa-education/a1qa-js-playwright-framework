import ElementType from '../constants/ElementType.js';

export default class BaseElement {
  constructor(locator, name) {
    this.locator = locator;
    this.name = name;
    this.type = ElementType.ELEMENT;
  }
}
