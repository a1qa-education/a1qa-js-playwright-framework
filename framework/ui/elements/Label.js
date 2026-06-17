import ElementType from '../constants/ElementType.js';
import BaseElement from './BaseElement.js';

export class Label extends BaseElement {
  /**
   * Initializes a Label element with a specific locator and name for reporting.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} name
   */
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.LABEL;
  }
}
