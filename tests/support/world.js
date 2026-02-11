import { setWorldConstructor, World } from '@cucumber/cucumber';

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browserWrapper = null; // Will hold your custom 'Browser' class instance
  }
}

setWorldConstructor(CustomWorld);
