import { Button, Dropdown, TextBox } from "#framework/ui/elements/index.js";
import BasePage from "#framework/ui/page/BasePage.js";

export default class WikipediaMainPage extends BasePage {
  constructor(page) {
    super(new TextBox(page.locator('input#searchInput'), 'main page unique element'), 'Main Page');
    this.searchLanguage =  new Dropdown(page.locator('#searchLanguage'), 'Search language dropdown');
    this.searchTextBox = new TextBox(page.locator('//div[@class="search-input"]/input'), 'Search textbox');
    this.searchButton = new Button(page.locator('//form[@id="search-form"]/fieldset/button'), 'Search button');
  }

  async selectEnglishLanguage() {
    await this.searchLanguage.selectOption('English');
  }

  async typeSearchRequest(text) {
    await this.searchTextBox.typeText(text);
  }

  async searchClick() {
    await this.searchButton.click();
  }
}
