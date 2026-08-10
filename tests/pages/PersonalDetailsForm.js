import { Button } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class PersonalDetailsForm extends BasePage {
  constructor(page) {
    super(new Button(page.locator('.personal-details__form'), 'Personal Details Form unique locator'), 'Personal Details Form');
  }
}
