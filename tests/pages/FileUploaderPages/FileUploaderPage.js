import BasePage from "#framework/ui/page/BasePage.js";
import { Label, FileInput, Button } from '#framework/ui/elements/index.js';

export default class FileUploaderPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByText('File Uploader'), 'File Uploader page unique element'), 'File Uploader Page');
    this.fileInput = new FileInput(page.locator('#file-upload', 'File input'));
    this.uploadButton = new Button(page.locator('#file-submit'), 'Upload button');
  }

  async uploadFile(filePath) {
    await this.fileInput.uploadFile(filePath);
    await this.uploadButton.click();
  }
}
