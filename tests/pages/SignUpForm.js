import { Button, TextBox, Checkbox } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class SignUpForm extends BasePage {
  constructor(page) {
    super(new TextBox(page.getByPlaceholder('Choose Password'), 'Sign Up Form unique locator'), 'Sign Up Form');
    this.passwordTextbox = new TextBox(page.getByPlaceholder('Choose Password'), 'Password Textbox');
    this.emailTextbox = new TextBox(page.getByPlaceholder('email'), 'Email Textbox');
    this.domainTextbox = new TextBox(page.getByPlaceholder('Domain'), 'Domain Textbox');
    this.openDomainDropdownButton = new Button(page.locator('div[class*="opener"]'), 'Open Domain Dropdown Button');
    this.domainDropdownItemButton = (domain) => new Button(page.locator('.dropdown__list-item', { hasText: domain }), `${domain} Domain Dropdown Item Button`);
    this.nextButton = new Button(page.locator('a.button--secondary', { hasText: 'Next' }), 'Next Button');
    this.acceptTermsConditionsCheckbox = new Checkbox(page.locator('label[for="accept-terms-conditions"]'), 'Accept Terms Conditions');
  }

  async typePassword(password) {
    this.passwordTextbox.setText(password);
  }

  async typeEmail(email) {
    await this.emailTextbox.setText(email);
  }

  async typeDomain(domain) {
    await this.domainTextbox.setText(domain);
  }

  async selectDomain(domain) {
    await this.openDomainDropdownButton.click();
    await this.domainDropdownItemButton(domain).click();
  }

  async acceptTermsConditionsValue() {
    await this.acceptTermsConditionsCheckbox.click();
  }

  async clickNextButton() {
    await this.nextButton.click();
  }
}
