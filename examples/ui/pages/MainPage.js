import BasePage from "../../../framework/ui/page/BasePage.js";
import { Label } from '../../../framework/ui/elements/index.js';
import { preciseTextLocator } from "../../../framework/utils/locatorHelper.js";

export default class MainPage extends BasePage {
  constructor(page) {
    super(preciseTextLocator(page, 'Welcome to the-internet'), 'Main Page');
    this.navigationLink = (text) => new Label(page.locator(`//*[text()="${text}"]`), `Navigation link: ${text}`);
  }

  async clickNavigationLink(navigationText) {
    await this.navigationLink(navigationText).click();
  }
}
