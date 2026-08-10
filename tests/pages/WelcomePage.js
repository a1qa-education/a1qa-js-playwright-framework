import { Button } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class WelcomePage extends BasePage {
  constructor(page) {
    super(new Button(page.locator('.start__button'), 'Welcome page unique locator'), 'Welcome Page');
    this.clickHereToGoButton = new Button(page.getByRole('link', { name: 'HERE' }), 'Please click HERE to GO');
  }

  async clickHereToGoLink() {
    await this.clickHereToGoButton.click();
  }
}
