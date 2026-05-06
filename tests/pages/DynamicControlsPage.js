import BasePage from "#framework/ui/page/BasePage.js";
import { Button, TextBox, Label } from '#framework/ui/elements/index.js';

export default class DynamicControlsPage extends BasePage {
  constructor(page) {
    super(new Label(page.getByText('Dynamic Controls'), 'Dynamic Controls unique element'), 'Dynamic Controls Page');
    this.enableButton = new Button(page.locator('//*[@onclick="swapInput()"]'), 'Enable button');
    this.inputField = new TextBox(page.locator('//input[@type="text"]'), 'Input field');
  }

  // Implement all methods for dynamic_controls test

}
