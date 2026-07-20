import BasePage from "#framework/ui/page/BasePage.js";
import { Label } from '#framework/ui/elements/index.js';

export default class NewWindowPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByText('New Window'), 'New Window page unique element'), 'New Window Page');
    this.newWindowTextLabel = new Label(page.locator('.example h3'), 'New Window Text Label');
  }

  async getNewWindowLabelText() {
    return await this.newWindowTextLabel.getText();
  }
}
