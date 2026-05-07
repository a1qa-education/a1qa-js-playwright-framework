import BasePage from "#framework/ui/page/BasePage.js";
import { Label } from '#framework/ui/elements/index.js';

export default class MainPage extends BasePage {
  constructor(page) {
    super(new Label(page.locator('h1:has-text("Welcome to the-internet")'), 'Main Page Unique Element'), 'Main Page');
    this.navigationLink = (text) =>
      new Label(page.getByRole('link', { name: text, exact: true }), `Navigation link: ${text}`);
  }

  async clickNavigationLink(navigationText) {
    await this.navigationLink(navigationText).click();
  }
}
