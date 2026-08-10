import BasePage from '#framework/ui/page/BasePage.js';
import { Label } from '#framework/ui/elements/index.js';
import SignUpForm from './SignUpForm.js';
import InterestsForm from './InterestsForm.js';
import PersonalDetailsForm from './PersonalDetailsForm.js';
import CookiesForm from './CookiesForm.js';
import HelpForm from './HelpForm.js';

export default class MainPage extends BasePage {
  constructor(page) {
    super(new Label(page.locator('.bagaar-link__image'), 'Main page unique locator'), 'Main page');

    this.signUpForm = new SignUpForm(page);
    this.interestsForm = new InterestsForm(page);
    this.personalDetailsForm = new PersonalDetailsForm(page);
    this.helpForm = new HelpForm(page);
    this.cookiesForm = new CookiesForm(page);

    this.timerLabel = new Label(page.locator('div.timer--gray'), 'Timer Label');
  }

  async getTimerText() {
    return this.timerLabel.getText();
  }
}
