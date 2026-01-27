import { Button, TextBox } from "#framework/ui/elements/index.js";
import BasePage from "#framework/ui/page/BasePage.js";
import { preciseTextLocator } from "#framework/utils/locatorHelper.js";

export default class FramesPage extends BasePage {
  constructor(page) {
    super(new TextBox(preciseTextLocator(page, 'Frames'), 'js alerts page unique element'), 'JavaScript Alerts Page');
    this.nestedFramesButton = new Button(page.locator('//a[@href="/nested_frames"]'), 'Nested Frames button');
  }

  async clickNestedFramesBtn() {
    await this.nestedFramesButton.click();
  }
}
