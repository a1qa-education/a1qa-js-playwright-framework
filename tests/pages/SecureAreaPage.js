import { Button, Label, TextBox } from "#framework/ui/elements/index.js";
import BasePage from "#framework/ui/page/BasePage.js";
import { preciseTextLocator } from "#framework/utils/locatorHelper.js";

export default class SecureAreaPage extends BasePage {
  constructor(page) {
    super(new TextBox(preciseTextLocator(page, 'Secure Area'), 'secure area page unique element'), 'Secure Area Page');
    this.message = new Label(page.locator('.subheader'), 'Success message');
    this.logoutButton = new Button(page.locator('.button'), 'Logout button');
  }

  async getMessageText() {
    return this.message.getText();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }
}
