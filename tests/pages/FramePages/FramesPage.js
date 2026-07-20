import { Button, Label } from "#framework/ui/elements/index.js";
import BasePage from "#framework/ui/page/BasePage.js";

export default class FramesPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: 'Frames' }), 'Frames page unique element'), 'Frames Page');
    this.nestedFramesButton = new Button(page.getByRole('link', { name: 'Nested Frames' }), 'Nested Frames button');
  }

  async clickNestedFramesButton() {
    await this.nestedFramesButton.click();
  }
}
