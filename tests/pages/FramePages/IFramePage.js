import BasePage from "#framework/ui/page/BasePage.js";
import { Label, TextBox, Button } from "#framework/ui/elements/index.js";
import FrameUtils from "#framework/utils/FrameUtils.js";
import { preciseTextLocator } from "#framework/utils/locatorHelper.js";

// Export class
export default class IFramePage extends BasePage {
  constructor(page) {
    super(
      new Label(preciseTextLocator(page, 'An iFrame containing the TinyMCE WYSIWYG Editor'), "unique element of iFrame Page"),
      'iFrame Page'
    );
    // Implement elements 
    this.frameUtils = new FrameUtils(page);
    this.editor = new TextBox(this.frameUtils.locatorInFrames(
      ['#mce_0_ifr'], '#tinymce'), 'Editor input');
    this.editButton = new Button(preciseTextLocator(page, 'Edit'), 'Edit button');
    this.undoButton = new Button(preciseTextLocator(page, 'Undo'), 'Undo button');
  }
  // Implement methods

  async typeintoEditor(text) {
    await this.editor.typeText(text);
  }

  async getFrameText() {
    return await this.editor.getText(
      ['#mce_0_ifr'], '#tinymce'
    );
  }

  async undoChanges() {
    await this.editButton.click();
    await this.undoButton.click();
  }
}
