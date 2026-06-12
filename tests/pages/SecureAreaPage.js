import { Button, Label } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';
import { preciseTextLocator } from '#framework/utils/locatorHelper.js';

export default class SecureAreaPage extends BasePage {
  constructor(page) {
    super(new Label(preciseTextLocator(page, 'Secure Area'), 'secure area page unique element'), 'Secure Area Page');
    this.message = new Label(
      page.getByRole('heading', { name: /Welcome to the Secure Area/i }), 
      'Success message'
    );
    this.logoutButton = new Button(page.getByText('Logout', { exact: true }), 'Logout button');
  }

  async getMessageText() {
    return await this.message.getText();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }
}
