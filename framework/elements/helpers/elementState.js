import { expect } from '@playwright/test';

export default class ElementStateHandler {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  async isEnabled(timeout = 5000) {
    try {
      await expect(this._locator).toBeEnabled({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isDisplayed(timeout = 5000) {
    try {
      await expect(this._locator).toBeVisible({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isClickable(timeout = 5000) {
    try {
      await expect(this._locator).toBeVisible({ timeout });
      await expect(this._locator).toBeEnabled({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isSelected(timeout = 5000) {
    try {
      await expect(this._locator).toBeChecked({ timeout });
      return true;
    } catch {
      return false;
    }
  }
}
