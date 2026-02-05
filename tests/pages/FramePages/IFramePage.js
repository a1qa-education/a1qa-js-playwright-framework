import BasePage from "#framework/ui/page/BasePage.js";
import { Label, TextBox, Button } from "#framework/ui/elements/index.js";
import FrameUtils from "#framework/utils/FrameUtils.js";
import { preciseTextLocator } from "#framework/utils/locatorHelper.js";

// Export class
class IFramePage extends BasePage {
  constructor(page) {
    super(
      new Label(preciseTextLocator(page, 'An iFrame containing the TinyMCE WYSIWYG Editor'), "unique element of iFrame Page"),
      'iFrame Page'
    );

    // Implement elements 

  }

  // Implement methods
  
}
