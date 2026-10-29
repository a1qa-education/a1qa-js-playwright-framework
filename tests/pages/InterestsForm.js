import { Label } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';

export default class InterestsForm extends BasePage {
  constructor(page) {
    super(new Label(page.getByText('Choose 3 interests'), 'Interests form unique locator'), 'Interests form');
    this.interestsTitleLabel = new Label(page.getByText('Choose 3 interests'), 'Interests Title');
    this.pageIndicatorLabel = new Label(page.locator('div.page-indicator'), 'Page Indicator');
  }

  async isInterestsTitleDisplayed() {
    return await this.interestsTitleLabel.state.isDisplayed();
  }

  async getPageIndicatorText() {
    return await this.pageIndicatorLabel.getText();
  }
}
