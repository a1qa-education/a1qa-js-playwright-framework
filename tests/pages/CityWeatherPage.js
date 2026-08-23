import BasePage from '#framework/ui/page/BasePage.js';
import { Label } from '#framework/ui/elements/index.js';

export default class CityWeatherPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: /Weather in/i}), 'City Weather Page unique element'), 'City Weather Page');
    this.pageHeader = new Label(page.locator('//h1[@class="headline-banner__title"]'), 'Page Header')
  }

  async getPageHeaderText() {
    return await this.pageHeader.getText();
  }
}
