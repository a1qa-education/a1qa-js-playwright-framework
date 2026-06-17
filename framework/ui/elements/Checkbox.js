import { test } from '@playwright/test';
import ElementType from '../constants/ElementType.js';
import BaseElement from './BaseElement.js';

export class Checkbox extends BaseElement {
  /**
   * Initializes a Checkbox element with a specific locator and name for reporting.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} name
   */
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.CHECKBOX;
  }

  /**
   * Ensures that the checkbox is checked, encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async check() {
    await test.step(`${this._type} '${this._name}' — Check`, async () => {
      await this.locator.check();
    });
  }

  /**
   * Ensures that the checkbox is unchecked, encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async uncheck() {
    await test.step(`${this._type} '${this._name}' — Uncheck`, async () => {
      await this.locator.uncheck();
    });
  }
}
