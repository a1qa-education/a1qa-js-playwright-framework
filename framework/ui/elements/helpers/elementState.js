import { expect } from '@playwright/test';
import Timeouts from '../../constants/Timeouts.js';

export default class ElementStateHandler {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  async isEnabled(timeout = Timeouts.EXPLICIT_WAIT) {
    try {
      await expect(this._locator).toBeEnabled({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isDisplayed(timeout = Timeouts.EXPLICIT_WAIT) {
    try {
      await expect(this._locator).toBeVisible({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isClickable(timeout = Timeouts.EXPLICIT_WAIT) {
    try {
      await expect(this._locator).toBeVisible({ timeout });
      await expect(this._locator).toBeEnabled({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isSelected(timeout = Timeouts.EXPLICIT_WAIT) {
    try {
      await expect(this._locator).toBeChecked({ timeout });
      return true;
    } catch {
      return false;
    }
  }
}
