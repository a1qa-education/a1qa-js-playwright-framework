import BasePage from "#framework/ui/page/BasePage.js";
import { Label } from '#framework/ui/elements/index.js';

export default class FileDownloadPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByText('File Downloader'), 'File Download Page unique element'), 'File Download Page');
    this.fileLabel = (text) => new Label(page.getByText(text, { exact: true }), 'File label');
  }

  async isFileLabelDisplayed(fileName) {
    return await this.fileLabel(fileName).state.isDisplayed();
  }

  async clickDownloadFile(fileName) {
    await this.fileLabel(fileName).click();
  }
}
