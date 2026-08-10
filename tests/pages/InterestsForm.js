import { Button, Checkbox, ElementsList, FileInput } from '#framework/ui/elements/index.js';
import BasePage from '#framework/ui/page/BasePage.js';
import RandomUtils from '#framework/utils/RandomUtils.js';

export default class InterestsForm extends BasePage {
  constructor(page) {
    super(new Button(page.locator('a[class*="avatar-and-interests"]'), 'Interests form unique locator'), 'Interests form');
    this.uploadButton = new FileInput(page.locator('a[class*="upload-button"]'), 'Upload Button');
    this.nextButton = new Button(page.getByRole('link', { name: 'Next' }), 'Next Button');
    this.unselectAllCheckbox = new Checkbox(page.locator('label[for*="unselectall"]'), 'Unselect All Checkbox');
    this.interestCheckboxes = new ElementsList(page.locator('label[for*="interest"]'), 'Interests Checkboxes', Checkbox);
  }

  async clickRandomInterests(number) {
    await this.unselectAllCheckbox.click();

    let counter = 0;
    while (counter < number) {
      const randomIndex = RandomUtils.getRandomInt(await this.interestCheckboxes.getCount());
      await this.interestCheckboxes.getByIndex(randomIndex).click();
      counter++;
    }
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  async uploadAvatar(filePath) {
    await this.uploadButton.uploadFileWithChooser(filePath);
  }
}
