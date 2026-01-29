import BaseElement from './BaseElement.js';
import ElementType from "../constants/ElementType.js";

export class FileInput extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.FILE_INPUT;
  }

  /**
   * Upload file into <input type=file>
   * @param {string} filePath 
   * @returns {Promise<void>}
   */
  async uploadFile(filePath) {
    await this._locator.setInputFiles(filePath);
  }

  async clear() {
    await this._locator.setInputFiles([]);
  }
}
