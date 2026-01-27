import BasePage from "../../../framework/ui/page/BasePage.js";
import { Label } from '../../../framework/ui/elements/index.js';
import { preciseTextLocator } from "../../../framework/utils/locatorHelper.js";

export default class NewWindowPage extends BasePage {
  constructor(page) {
    super(new Label(preciseTextLocator(page, 'New Window'), 'new window page unique element'), 'New Window Page');    
    this.newWindowLbl = new Label(page.locator('//div[@class="example"]//h3'), 'new window button');
  }

  async isNewWindowLblDisplayed() {
    this.newWindowLbl.waitForDisplayed();
    return this.newWindowLbl.state.isDisplayed();
  }
}
