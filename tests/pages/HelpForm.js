import { Button } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class HelpForm extends BasePage {
  constructor(page) {
    super(new Button(page.locator('.help-form'), 'Help form unique locator'), 'Help form');
    this.sendToBottomButton = new Button(page.locator('.help-form__send-to-bottom-button'), 'Send To Bottom Button');
  }

  async clickSendToBottomButton() {
    await this.sendToBottomButton.click();
  }
}
