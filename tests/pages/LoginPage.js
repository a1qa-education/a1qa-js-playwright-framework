import { Button, TextBox, Label } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: 'Login Page' }), 'login page unique locator'), 'Login Page');
    this.usernameInput = new TextBox(page.getByLabel('Username'), 'Username input');
    this.passwordInput = new TextBox(page.getByLabel('Password'), 'Password input');
    this.loginButton = new Button(page.getByRole('button', { name: 'Login' }), 'Login button');
  }

  async typeUsername(username) {
    await this.usernameInput.setText(username);
  }

  async typePassword(password) {
    await this.passwordInput.setText(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
