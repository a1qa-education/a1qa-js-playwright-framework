import { expect } from '@playwright/test';
import Timeouts from '../../constants/Timeouts.js';

export default class ElementStateHandler {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  /**
   * Internal error handler.
   * Swallows only timeout errors (indicating the state was not met).
   * Rethrows all other unexpected errors (strict mode, target closed, invalid selector).
   * 
   * @param {Error} error 
   * @returns {boolean}
   */
  _handleError(error) {
    // Rely on Playwright's error name for standard timeouts, 
    // with a fallback for expect() assertion timeouts.
    const isTimeout = error.name === 'TimeoutError' || 
                      error.message.includes('Timeout') || 
                      error.message.includes('timed out');

    if (isTimeout) {
      return false;
    }
    
    // Rethrow any critical infrastructure or locator errors
    throw error;
  }

  async isEnabled(timeout = Timeouts.EXPLICIT_WAIT) {
    try {
      await expect(this._locator).toBeEnabled({ timeout });
      return true;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async isDisplayed(timeout = Timeouts.EXPLICIT_WAIT) {
    try {
      await expect(this._locator).toBeVisible({ timeout });
      return true;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async isClickable(timeout = Timeouts.EXPLICIT_WAIT) {
    try {
      await expect(this._locator).toBeVisible({ timeout });
      await expect(this._locator).toBeEnabled({ timeout });
      return true;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async isSelected(timeout = Timeouts.EXPLICIT_WAIT) {
    try {
      await expect(this._locator).toBeChecked({ timeout });
      return true;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async isPresent() {
    try {
      // count() does not wait, but if the locator itself is completely broken (strict mode), 
      // it will throw an error here.
      return (await this._locator.count()) > 0;
    } catch (error) {
      return this._handleError(error);
    }
  }
}
