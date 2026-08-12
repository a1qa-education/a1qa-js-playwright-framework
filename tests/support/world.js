import { setWorldConstructor, World } from '@cucumber/cucumber';

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browserWrapper = null; // Will hold your custom 'Browser' class instance
    this._pages = {};           // Cache for Page Objects
  }

  /**
   * Lazily instantiates and caches a Page Object for the lifetime of a scenario.
   * Eliminates the need to call `new PageClass(...)` in every step definition.
   * 
   * @param {class} PageClass - The class of the Page Object to instantiate
   * @returns {object} The instantiated Page Object
   */
  getPage(PageClass) {
    const key = PageClass.name;
    if (!this._pages[key]) {
      this._pages[key] = new PageClass(this.browserWrapper.page);
    }
    return this._pages[key];
  }
}

setWorldConstructor(CustomWorld);
