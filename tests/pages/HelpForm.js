import { Button, Label } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

const HEIGHT_CSS_PROPERTY = 'height';
const PIXELS_SUFFIX = 'px';

export default class HelpForm extends BasePage {
  constructor(page) {
    super(new Button(page.locator('.help-form'), 'Help form unique locator'), 'Help form');
    this.form = new Label(page.locator('.help-form'), 'Help form');
    this.sendToBottomButton = new Button(page.locator('.help-form__send-to-bottom-button'), 'Send To Bottom Button');
  }

  async clickSendToBottomButton() {
    await this.sendToBottomButton.click();
  }

  /**
   * Returns the currently rendered height of the help form in pixels.
   * @returns {Promise<number>}
   */
  async getHeight() {
    const height = await this.form.getCssProperty(HEIGHT_CSS_PROPERTY);
    return Number.parseFloat(height.replace(PIXELS_SUFFIX, ''));
  }
}
