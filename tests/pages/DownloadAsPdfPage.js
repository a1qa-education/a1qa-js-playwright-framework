import BasePage from "#framework/ui/page/BasePage.js";
import { Label, Button } from '#framework/ui/elements/index.js';

export default class DownloadAsPdfPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: 'Download as PDF' }), 'Download as PDF page unique element'), 'Download as PDF Page');
    this.fileNameLabel =  new Label(page.locator('//div[@class="mw-electronpdfservice-selection-label-desc"]'), 'File name label');
  }

  async getFileName() {
    return await this.fileNameLabel.getText();
  }
}
