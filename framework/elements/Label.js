import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class Label extends BaseElement {
  constructor(page, locator, name) {
    super(page, locator, name);
    this._type = ElementType.LABEL;
  }
}
