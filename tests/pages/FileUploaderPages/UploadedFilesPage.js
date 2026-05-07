import BasePage from "#framework/ui/page/BasePage.js";
import { Label } from '#framework/ui/elements/index.js';

export default class UploadedFilesPage extends BasePage {
  // Implement Page Object
  constructor(page) {
    super(new Label(page.getByText('File Uploader'), 'File Uploader page unique element'), 'File Uploader Page');
    this.uploadedFileName = new Label(page.locator('#uploaded-files '), 'Uploaded file name');
  }

  async getUploadedFileName() {
    return await this.uploadedFileName.getText();
  }
}
