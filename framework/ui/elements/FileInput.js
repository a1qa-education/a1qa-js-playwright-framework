import Logger from '#framework/utils/Logger.js';
import BaseElement from './BaseElement.js';
import ElementType from '../constants/ElementType.js';

export class FileInput extends BaseElement {
  /**
   * Initializes a FileInput element with a specific locator and name for reporting.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} name
   */
  constructor(locator, name) {
    super(locator, name);
    this._type = ElementType.FILE_INPUT;
  }

  /**
   * Uploads a file into the <input type="file"> element, encapsulated within a reporting step.
   * @param {string} filePath
   * @returns {Promise<void>}
   */
  async uploadFile(filePath) {
    await Logger.step(`${this._type} '${this._name}' — Upload file: "${filePath}"`, async () => {
      await this.locator.setInputFiles(filePath);
    });
  }

  /**
   * Clears the file input element, encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async clear() {
    await Logger.step(`${this._type} '${this._name}' — Clear file input`, async () => {
      await this.locator.setInputFiles([]);
    });
  }
}
