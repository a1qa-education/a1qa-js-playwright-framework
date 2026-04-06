import BasePage from "#framework/ui/page/BasePage.js";
import { Label, TextBox, Button, Dropdown } from '#framework/ui/elements/index.js';

export default class WikiMainPage extends BasePage {
    constructor(page) {
        super(
            new Label(page.locator('#www-wikipedia-org'), 'Wikipedia main page unique element'),
            'Wikipedia Main Page'
        );
        this.languageDropdown = new Dropdown(page.locator('#searchLanguage'), 'Language dropdown');
        this.searchInput = new TextBox(page.locator('#searchInput'), 'Search input');
        this.searchButton = new Button(page.locator('button[type="submit"]'), 'Search button');
    }

    async selectLanguage(language) {
        await this.languageDropdown.selectOption(language);
    }

    async searchFor(text) {
        await this.searchInput.typeText(text);
        await this.searchButton.click();
    }
}