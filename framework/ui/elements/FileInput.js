import { test } from '@playwright/test';
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
    await test.step(`${this._type} '${this._name}' — Upload file: "${filePath}"`, async () => {
      await this.locator.setInputFiles(filePath);
    });
  }

  /**
   * Clicks the element and passes the file to the file chooser it opens, encapsulated within a reporting step.
   * Use this when the upload control is not an <input type="file"> element and the page exposes
   * no file input to target, so uploadFile() cannot be used.
   * @param {string|string[]} filePath - Path(s) of the file(s) to upload
   * @returns {Promise<void>}
   */
  async uploadFileWithChooser(filePath) {
    await test.step(`${this._type} '${this._name}' — Upload file through the file chooser: "${filePath}"`, async () => {
      const [fileChooser] = await Promise.all([
        this.locator.page().waitForEvent('filechooser'),
        this.locator.click(),
      ]);

      await fileChooser.setFiles(filePath);
    });
  }

  /**
   * Clears the file input element, encapsulated within a reporting step.
   * @returns {Promise<void>}
   */
  async clear() {
    await test.step(`${this._type} '${this._name}' — Clear file input`, async () => {
      await this.locator.setInputFiles([]);
    });
  }
}
