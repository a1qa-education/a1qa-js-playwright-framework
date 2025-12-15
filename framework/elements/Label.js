import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class Label extends BaseElement {
  constructor(page, selector, name) {
    super(page, selector, name);
    this._type = ElementType.LABEL;
  }
}
