import BasePage from "../../../framework/ui/page/BasePage.js";
import { Label } from "../../../framework/ui/elements/index.js";
import FrameUtils from "../../../framework/utils/FrameUtils.js";

export default class NestedFramesPage extends BasePage {
  constructor(page) {
    super(
      new Label(page.locator('frame[name="frame-top"]'), "unique element of a page"),
      'Nested Frames Page'
    );

    this.frameUtils = new FrameUtils(page, 'NestedFrames');
  }

  async getMiddleFrameText() {
    return await this.frameUtils.getText(
      ['frame[name="frame-top"]', 'frame[name="frame-middle"]'],
      '#content'
    );
  }

  async getLeftFrameText() {
    return await this.frameUtils.getText(
      ['frame[name="frame-top"]', 'frame[name="frame-left"]'],
      'body'
    );
  }
}
