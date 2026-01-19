import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class Button extends BaseElement {
  constructor(page, locator, name) {
    super(page, locator, name);
    this._type = ElementType.BUTTON;
  }
}
