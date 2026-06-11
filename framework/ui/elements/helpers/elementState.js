import { expect } from '@playwright/test';
import Timeouts from '../../constants/Timeouts.js';

export default class ElementStateHandler {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  /**
   * Internal error handler.
   * Skips regular timeouts (returns false), 
   * but throws critical failures (strict mode, page closure).
   * 
   * @param {Error} error 
   * @returns {boolean}
   */
  _handleError(error) {
    if (error.message.includes('strict mode violation')) {
      throw new Error(`Strict mode violation for element "${this._name}": ${error.message}`);
    }
    
    if (error.message.includes('Target closed') || error.message.includes('browser has been closed')) {
      throw new Error(`Page or browser closed while waiting for element "${this._name}": ${error.message}`);
    }
    
    // If this is a regular Timeout, return false
    return false;
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
      return (await this._locator.count()) > 0;
    } catch (error) {
      return this._handleError(error);
    }
  }
}