import BasePage from "#framework/ui/page/BasePage.js";
import { Label, Button } from '#framework/ui/elements/index.js';

export default class MainPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: 'Welcome to the-internet' }), 'main page unique element'), 'Main Page');
    this.navigationLink = (text) => new Button(page.getByRole('link', { name: text, exact: true }), `Navigation link: ${text}`);
  }

  async clickNavigationLink(navigationText) {
    await this.navigationLink(navigationText).click();
  }
}
