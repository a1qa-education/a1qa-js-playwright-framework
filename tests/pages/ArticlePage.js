import BasePage from "#framework/ui/page/BasePage.js";
import { Label, Button } from '#framework/ui/elements/index.js';

export default class ArticlePage extends BasePage {
    constructor(page) {
        super(
            new Label(page.locator('#firstHeading'), 'Article page unique element'),
            'Article Page'
        );
        this.toolsMenu = new Button(page.locator('#vector-page-tools-dropdown-checkbox'), 'Tools menu');
        this.downloadAsPdfButton = new Button(page.locator('a[href*="DownloadAsPdf"]'), 'Download as PDF button');
    }

    async clickToolsMenu() {
        await this.toolsMenu.click();
    }

    async clickDownloadAsPdf() {
        await this.downloadAsPdfButton.click();
    }
}