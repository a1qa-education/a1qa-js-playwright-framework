import BasePage from "#framework/ui/page/BasePage.js";
import { Label } from '#framework/ui/elements/index.js';

export default class MainPage extends BasePage {
  constructor(page) {
    super(new Label(page.locator('//a[@href="/javascript_alerts"]'), 'main page unique element'), 'Main Page');
    this.navigationLink = (text) => new Label(page.locator(`//*[text()="${text}"]`), `Navigation link: ${text}`);
  }

  async clickNavigationLink(navigationText) {
    await this.navigationLink(navigationText).click();
  }
}
