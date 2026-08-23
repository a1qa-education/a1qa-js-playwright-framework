import BasePage from '#framework/ui/page/BasePage.js';
import { ElementsList, Label, TextBox, Button } from '#framework/ui/elements/index.js';
import { expect } from '@playwright/test';

export default class WeatherPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: 'World Temperatures'}), 'Weather Page unique element'), 'Weather Page');
    this.page = page;
    this.searchInput = new TextBox(page.getByRole('searchbox', { name: 'Search for city, state or country…' }), 'Search textbox');
    this.pageHeaderLabel = new Label(page.locator('h1.bn-header__title'), 'Page Header');
    this.searchResultList=new ElementsList(page.locator('ul.asu > li > a'),'Search Results list', Button);
  }

  async checkPageTitle(expected) {
    const headerText = await this.pageHeaderLabel.getText();
    expect(headerText).toContain(expected);
  }

  async waitForDropdownApear(timeout) {
    await this.page.waitForTimeout(timeout)
  }

  async clickElementByNumber(number) {
    await this.searchResultList.getByIndex(number - 1).click();
  }

}
