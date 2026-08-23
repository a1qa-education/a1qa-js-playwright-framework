import BasePage from '#framework/ui/page/BasePage.js';
import { Label } from '#framework/ui/elements/index.js';

export default class MainPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByText('Current Time', { exact: true }), 'Main Page Header'), 'Main Page');
    this.navigationLink = (text) => new Label(page.locator('#nav').getByRole('listitem', { name: text, exact: true }), `Navigation link: ${text}`);
  }

  async clickNavigationLink(navigationText) {
    await this.navigationLink(navigationText).click();
  }
}
