import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class Button extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.BUTTON;
  }
}
