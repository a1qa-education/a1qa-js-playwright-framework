import { Label } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class SecureAreaPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: 'Secure Area', level: 2 }), 'secure area page unique element'), 'Secure Area Page');
    this.message = new Label(
      page.getByRole('heading', { name: /Welcome to the Secure Area/i }),
      'Success message'
    );
    this.logoutButton = new Label(page.getByText('Logout', { exact: true }), 'Logout link');
  }

  async getMessageText() {
    return await this.message.getText();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }
}
