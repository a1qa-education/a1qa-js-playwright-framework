import BasePage from '#framework/ui/page/BasePage.js';
import { Label } from '#framework/ui/elements/index.js';

export default class MainPage extends BasePage {
  constructor(page) {
    super(
      new Label(page.getByRole('heading', { name: /Welcome to the-internet/i, level: 1 }), 'Main Page Header'),
      'Main Page'
    );
    this.navigationLink = (text) => new Label(this.page.getByRole('link', { name: text }), `Navigation link: ${text}`);

    this.page = page;
  }

  async clickNavigationLink(navigationText) {
    await this.navigationLink(navigationText).click();
  }
}
