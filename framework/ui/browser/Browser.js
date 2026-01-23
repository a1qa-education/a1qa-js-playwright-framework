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
}
