/**
 * createPageFactory - returns a factory function that lazily imports
 * and caches page objects by name.
 *
 * @param {import('playwright').Page} page - Playwright Page instance to pass to page constructors
 * @returns {function(string): Promise<object>} getPage - async function to retrieve a page instance
 */
export function createPageFactory(page) {
  const cache = new Map();

  return async function getPage(name) {
    if (cache.has(name)) return cache.get(name);

    let PageClass;
    switch (name) {
      case 'Main Page':
        PageClass = (await import('../../../tests/pages/MainPage.js')).default;
        break;
      case 'Login Page':
        PageClass = (await import('../../../tests/pages/LoginPage.js')).default;
        break;
      case 'Secure Area Page':
        PageClass = (await import('../../../tests/pages/SecureAreaPage.js')).default;
        break;
      default:
        throw new Error(`Unknown page: ${name}`);
    }

    const instance = new PageClass(page);
    cache.set(name, instance);
    return instance;
  };
}
