import BasePage from "#framework/ui/page/BasePage.js";
import { Label, Button } from '#framework/ui/elements/index.js';

export default class DownloadPdfPage extends BasePage {
    constructor(page) {
        super(
            new Label(page.locator('.mw-electronpdfservice-selection-download-image'), 'Download PDF page unique element'),
            'Download PDF Page'
        );
        this.fileName = new Label(page.locator('.mw-electronpdfservice-selection-label-desc'), 'File name label');
        this.downloadButton = new Button(page.locator('button[type="submit"].oo-ui-buttonElement-button'), 'Download button');
    }

    async getFileName() {
        return await this.fileName.getText();
    }

    async clickDownload() {
        await this.downloadButton.click();
    }
}