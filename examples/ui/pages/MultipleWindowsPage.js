import BasePage from "../../../framework/ui/page/BasePage.js";
import { Label, Button } from '../../../framework/ui/elements/index.js';

export default class MultipleWindowsPage extends BasePage {
  constructor(page) {
    super(new Label(page.locator('//a[@href="/windows/new"]'), ',multiple windows page unique element'), 'Multiple Windows Page');
    this.newWindowBtn = new Button(page.locator('//a[@href="/windows/new"]'), 'new window button');
  }

  async clickNewWindowBtn() {
    await this.newWindowBtn.click();
  }
}
