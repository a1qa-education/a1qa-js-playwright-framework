import BasePage from '#framework/ui/page/BasePage.js';
import { Label } from '#framework/ui/elements/index.js';
import SignUpForm from './SignUpForm.js';
import InterestsForm from './InterestsForm.js';
import CookiesForm from './CookiesForm.js';

export default class MainPage extends BasePage {
  constructor(page) {
    super(new Label(page.locator('div.timer--white'), 'Main page unique locator'), 'Main page');

    this.signUpForm = new SignUpForm(page);
    this.interestsForm = new InterestsForm(page);
    this.cookiesForm = new CookiesForm(page);

    this.timerLabel = new Label(page.locator('div.timer--white'), 'Timer Label');
  }

  async getTimerText() {
    return this.timerLabel.getText();
  }
}
