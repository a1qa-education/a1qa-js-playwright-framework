export default class BasePage {
  #uniqueElement;

  constructor(uniqueElement, name) {
    this.#uniqueElement = uniqueElement;
    this.name = name;
  }

  /**
   * Get name of the page
   * @returns {string} Name of the page
   */
  getPageName() {
    return this.name;
  }
}
