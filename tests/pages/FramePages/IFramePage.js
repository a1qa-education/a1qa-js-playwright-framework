import BasePage from '#framework/ui/page/BasePage.js';
import { Label, TextBox, Button } from '#framework/ui/elements/index.js';
import FrameUtils from '#framework/utils/FrameUtils.js';

export default class IFramePage extends BasePage {
  constructor(page) {
    super(
      new Label(page.getByText('An iFrame containing the TinyMCE WYSIWYG Editor', { exact: true }), 'unique element of iFrame Page'),
      'iFrame Page'
    );
    this.frameUtils = new FrameUtils(page);
    this.editor = new TextBox(this.frameUtils.locatorInFrames(
      ['#mce_0_ifr'],
      '#tinymce'
    ), 'Editor input');
    this.editButton = new Button(page.getByText('Edit', { exact: true }), 'Edit button');
    this.undoOption = new Label(page.getByText('Undo', { exact: true }), 'Undo option');
  }

  async typeIntoEditor(text) {
    await this.editor.typeText(text);
  }

  async getFrameText() {
    return this.frameUtils.getText(
      ['#mce_0_ifr'],
      '#tinymce'
    );
  }

  async undoChanges() {
    await this.editButton.click();
    await this.undoOption.click();
  }
}
