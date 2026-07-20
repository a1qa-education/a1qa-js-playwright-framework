import BasePage from "#framework/ui/page/BasePage.js";
import { Label } from '#framework/ui/elements/index.js';

export default class BasicAuth extends BasePage {
  constructor(page) {
    super(new Label(page.getByText("Basic Auth"), 'basic auth page unique element'), 'Basic Auth Page');
    // Add elements to interact with
  }

  async getSuccessMessage() {
    return this.successMessage.getText();
  }
}
