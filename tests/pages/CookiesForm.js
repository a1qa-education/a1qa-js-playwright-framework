import { Button } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class CookiesForm extends BasePage {
  constructor(page) {
    super(new Button(page.locator('.cookies'), 'Cookies form unique locator'), 'Cookies form');
    this.acceptCookiesButton = new Button(page.getByRole('button', { name: 'Yes' }), 'Accept Cookies Button');
  }

  async clickAcceptCookiesButton() {
    await this.acceptCookiesButton.click();
  }
}
