export default class ElementStateHandler {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  async isEnabled() {
    return await this._locator.isEnabled();
  }

  async isDisplayed() {
    return await this._locator.isVisible();
  }

  async isClickable() {
    return (await this._locator.isEnabled()) &&
           (await this._locator.isVisible());
  }

  async isSelected() {
    return await this._locator.isChecked();
  }
}
