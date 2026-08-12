import BasePage from '#framework/ui/page/BasePage.js';
import { Label } from '#framework/ui/elements/index.js';

export default class BasicAuth extends BasePage {
  constructor(page) {
    super(
      new Label(
        page.getByRole('heading', { name: 'Basic Auth' }),
        'basic auth page unique element'),
      'Basic Auth Page'
    );
    this.successMessage = new Label(page.locator('//*[@id="content"]/div/p'), 'Success message');
  }

  async getSuccessMessage() {
    return this.successMessage.getText();
  }
}
