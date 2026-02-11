import { Button, Label } from "#framework/ui/elements/index.js";
import BasePage from "#framework/ui/page/BasePage.js";
import { preciseTextLocator } from "#framework/utils/locatorHelper.js";

export default class FramesPage extends BasePage {
  constructor(page) {
    super(new Label(preciseTextLocator(page, 'Frames'), 'Frames page unique element'), 'Frames Page');
    this.iframeButton = new Button(page.locator('//a[@href="/iframe"]'), 'iFrame button');
  }

  async clickIframeButton() {
    await this.iframeButton.click();
  }
}
