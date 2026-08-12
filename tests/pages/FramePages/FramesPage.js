import { Button, Label } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class FramesPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByText('Frames', { exact: true }), 'Frames page unique element'), 'Frames Page');
    this.iframeButton = new Button(page.getByRole('link', { name: 'iFrame' }), 'iFrame button');
  }

  async clickIframeButton() {
    await this.iframeButton.click();
  }
}
