export default class Browser {
  constructor(page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  async openUrl(url) {
    await this._page.goto(url);
  }

  async getCurrentUrl() {
    return this._page.url();
  }

  async refresh(){
    await this._page.refresh();
  }

  async navigateBack() {
    await this._page.goBack();
  }
  
  async navigateForward() {
    await this._page.goForward();
  }

  /**
   * Accept an alert triggered by a callback action
   */
  async acceptAlert(actionCallback) {
    const listener = async dialog => {
      await dialog.accept();
      this._page.off('dialog', listener);
    };

    this._page.on('dialog', listener);
    await actionCallback();
  }
}
