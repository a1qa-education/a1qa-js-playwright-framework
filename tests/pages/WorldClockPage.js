import BasePage from '#framework/ui/page/BasePage.js';
import { Label, TextBox, Button } from '#framework/ui/elements/index.js';
import { expect } from '@playwright/test';

export default class WorldClockPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: /Personal World Clock/i}), 'Personal World Clock Page unique element'), 'Personal World Clock');
    this.page = page;
    this.personalWorldClockButton = (text) => new Button(page.getByText(text), `Personal World Clock Button: ${text}`);
    this.personalWorldClockModal = (text) => new Label(page.locator(`//div[@class="modal-header"]/h2[text()="${text}"]`), `Personal World Clock Modal: ${text}`);
    this.modalTextbox = (id) => new TextBox(page.locator(`#${id}`), `Modal Textbox with id: ${id}`);
    this.suggestionItems = page.locator('//ul[@class="asu"]//li/a');
    this.modalButton = (text) => new Button(page.locator('div.modal-footer').getByText(text), `${text} Modal button`);
    this.cityNameLabel = (text) => new Label(page.locator(`//a[@class="c-city__name" and text()="${text}"]`))
  }

  async isModalOpened(modalName) {
    expect(await this.personalWorldClockModal(modalName).state.isDisplayed()).toBeTruthy()
  }

  async waitForSuggestionsDisplayed(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async clickSuggestionItem(number) {
    await this.suggestionItems.nth(number - 1).click();
  }

  async clickModalButton(name) {
    await this.modalButton(name).click();
  }
}
