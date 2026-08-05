import { step } from '#framework/utils/stepHelper.js';
import ElementType from '../constants/ElementType.js';
import BaseElement from './BaseElement.js';

export class Dropdown extends BaseElement {
  /**
   * Initializes a Dropdown element with a specific locator and name for reporting.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} name
   */
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.DROPDOWN;
  }

  /**
   * Selects an option in the <select> element, encapsulated within a reporting step.
   * @param {string} option
   * @returns {Promise<void>}
   */
  async selectOption(option) {
    await step(`${this._type} '${this._name}' — Select option: "${option}"`, async () => {
      await this.locator.selectOption(option);
    });
  }
}
