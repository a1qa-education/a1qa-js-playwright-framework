export class ElementsList {
  /**
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
     * Get a specific element from the list by index.
     * Returns an instance of the ElementType (e.g., a new Button).
     * @param {number} index 
     * @returns {object} An instance of ElementType
     */
  getByIndex(index) {
    // We create a new instance of the specific element wrapper
    // passing the .nth(index) locator to it.
    const specificLocator = this.locator.nth(index);
    return new this.ElementType(specificLocator, `${this.name} [${index}]`);
  }

  /**
     * Get the number of elements in the list.
     */
  async getCount() {
    return await this.locator.count();
  }

  /**
     * Get text content of all elements in the list.
     * Useful for validation tables/lists.
     */
  async getAllTexts() {
    const count = await this.getCount();
        
    // Wait for the first element to be displayed if the list is not empty
    if (count > 0) {
      await this.getByIndex(0).waitForDisplayed();
    }
        
    return await this.locator.allInnerTexts();
  }
    
  /**
     * Iterate over the elements and perform an action.
     * @param {Function} action - Async function taking (element, index)
     */
  async executeForEach(action) {
    const count = await this.getCount();
    for (let i = 0; i < count; i++) {
      const element = this.getByIndex(i);
      await action(element, i);
    }
  }
}
