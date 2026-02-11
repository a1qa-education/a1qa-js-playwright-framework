import BasePage from "#framework/ui/page/BasePage.js";
import { Label } from '#framework/ui/elements/index.js';

export default class UploadedFilesPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByText('File Uploaded!'), 'Files Uploaded Page unique element'), 'File Uploaded Page');
    this.uploadedFileText = new Label(page.locator('#uploaded-files'), 'Uploaded file text');
  }

  async getUploadedFileName() {
    return await this.uploadedFileText.getText();
  }
}
