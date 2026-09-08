import { test } from '@playwright/test';

export class ElementsList {
  /**
   * Initializes an ElementsList to manage multiple identical elements.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} name
   * @param {class} ElementType
   */
  constructor(locator, name, ElementType) {
    this.locator = locator;
    this.name = name;
    this.ElementType = ElementType;
  }

  /**
   * Gets a specific element from the list by index.
   * Returns an instance of the ElementType (e.g., a new Button).
   * @param {number} index
   * @returns {object} An instance of ElementType
   */
  getByIndex(index) {
    const specificLocator = this.locator.nth(index);
    return new this.ElementType(specificLocator, `${this.name} [${index}]`);
  }

  /**
   * Gets the number of elements in the list, encapsulated within a reporting step.
   * @returns {Promise<number>}
   */
  async getCount() {
    return await test.step(`ElementsList '${this.name}' — Get count`, async () => {
      return await this.locator.count();
    });
  }

  /**
   * Gets the text content of all elements in the list, encapsulated within a reporting step.
   * @param {number} [expectedCount] - Optional expected number of elements. When provided,
   *   waits until that many elements are present to avoid reading a partially-rendered list.
   * @returns {Promise<Array<string>>}
   */
  async getAllTexts(expectedCount) {
    return await test.step(`ElementsList '${this.name}' — Get all texts`, async () => {
      if (typeof expectedCount === 'number' && expectedCount > 0) {
        await this.getByIndex(expectedCount - 1).waitForDisplayed();
      } else {
        const count = await this.getCount();
        if (count > 0) {
          await this.getByIndex(0).waitForDisplayed();
        }
      }

      return await this.locator.allInnerTexts();
    });
  }

  /**
   * Iterates over the elements and performs an action, encapsulated within a reporting step.
   * @param {Function} action - Async function taking (element, index)
   * @returns {Promise<void>}
   */
  async executeForEach(action) {
    await test.step(`ElementsList '${this.name}' — Execute action for each element`, async () => {
      const count = await this.getCount();
      for (let i = 0; i < count; i++) {
        const element = this.getByIndex(i);
        await action(element, i);
      }
    });
  }
}
