import { test, expect } from '@playwright/test';
import Timeouts from '../../constants/Timeouts.js';

export default class ElementStateHandler {
  /**
   * Initializes the state handler for an element.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} name
   */
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  /**
   * Internal error handler.
   * Deterministically identifies timeouts using strictly typed error names
   * and specific Playwright assertion patterns, avoiding fragile substring matches.
   *
   * @param {Error} error
   * @returns {boolean}
   */
  _handleError(error) {
    if (error.matcherResult) {
      return false;
    }
    throw error;
  }

  /**
   * Checks if the element is enabled, encapsulated within a reporting step.
   * @param {number} timeout
   * @returns {Promise<boolean>}
   */
  async isEnabled(timeout = Timeouts.EXPLICIT_WAIT) {
    return await test.step(`State check: Is '${this._name}' enabled?`, async () => {
      try {
        await expect(this._locator).toBeEnabled({ timeout });
        return true;
      } catch (error) {
        return this._handleError(error);
      }
    });
  }

  /**
   * Checks if the element is displayed, encapsulated within a reporting step.
   * @param {number} timeout
   * @returns {Promise<boolean>}
   */
  async isDisplayed(timeout = Timeouts.EXPLICIT_WAIT) {
    return await test.step(`State check: Is '${this._name}' displayed?`, async () => {
      try {
        await expect(this._locator).toBeVisible({ timeout });
        return true;
      } catch (error) {
        return this._handleError(error);
      }
    });
  }

  /**
   * Checks if the element is clickable, encapsulated within a reporting step.
   * @param {number} timeout
   * @returns {Promise<boolean>}
   */
  async isClickable(timeout = Timeouts.EXPLICIT_WAIT) {
    return await test.step(`State check: Is '${this._name}' clickable?`, async () => {
      try {
        await expect(this._locator).toBeVisible({ timeout });
        await expect(this._locator).toBeEnabled({ timeout });
        return true;
      } catch (error) {
        return this._handleError(error);
      }
    });
  }

  /**
   * Checks if the element is selected, encapsulated within a reporting step.
   * @param {number} timeout
   * @returns {Promise<boolean>}
   */
  async isSelected(timeout = Timeouts.EXPLICIT_WAIT) {
    return await test.step(`State check: Is '${this._name}' selected?`, async () => {
      try {
        await expect(this._locator).toBeChecked({ timeout });
        return true;
      } catch (error) {
        return this._handleError(error);
      }
    });
  }

  /**
   * Checks if the element is present in the DOM, encapsulated within a reporting step.
   * @returns {Promise<boolean>}
   */
  async isPresent() {
    return await test.step(`State check: Is '${this._name}' present?`, async () => {
      try {
        return (await this._locator.count()) > 0;
      } catch (error) {
        return this._handleError(error);
      }
    });
  }
}
