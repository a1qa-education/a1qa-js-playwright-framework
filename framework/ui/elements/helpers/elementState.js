import { expect } from '@playwright/test';
import Timeouts from '../../constants/Timeouts.js';

export default class ElementStateHandler {
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
    // 1. Native Playwright actions (waitFor, click, etc.) throw a strict TimeoutError class.
    if (error.name === 'TimeoutError') {
      return false;
    }
    
    // 2. Playwright web-first assertions (expect) throw a standard Error, 
    // but follow a strict and predictable system pattern: "Error: expect(locator).to...: Timeout"
    const isAssertionTimeout = error.name === 'Error' && /^expect.*?: Timeout/i.test(error.message);
    
    if (isAssertionTimeout) {
      return false;
    }
    
    // Rethrow all other unexpected errors (strict mode, target closed, node detached)
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
      // count() evaluates immediately without waiting.
      // Note: count() explicitly bypasses strict mode (it just returns the number of elements).
      // This try/catch is here to safely handle engine-level errors 
      // (e.g., invalid XPath/CSS syntax or closed browser context).
      return (await this._locator.count()) > 0;
    } catch (error) {
      return this._handleError(error);
    }
  }
}
