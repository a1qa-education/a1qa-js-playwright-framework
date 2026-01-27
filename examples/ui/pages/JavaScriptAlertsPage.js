import { Button, Label, TextBox } from "../../../framework/ui/elements/index.js";
import BasePage from "../../../framework/ui/page/BasePage.js";
import { preciseTextLocator } from "../../../framework/utils/locatorHelper.js";

export default class JavaScriptAlertsPage extends BasePage {
  constructor(page) {
    super(new TextBox(preciseTextLocator(page, 'JavaScript Alerts'), 'js alerts page unique element'), 'JavaScript Alerts Page');
    this.forJSAlertButton = new Button(page.locator('[onclick="jsAlert()"]'), 'Click for JS Alert Button');
    this.result = new Label(page.locator('#result'), 'Success message');
  }

  async clickForJSAlertButton() {
    await this.forJSAlertButton.click();
  }

  async getResultText() {
    return this.result.getText();
  }
}
