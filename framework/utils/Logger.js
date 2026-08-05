/**
 * Pluggable Logger for the framework.
 * This class abstracts away reporting mechanics (like Playwright's test.step) 
 * from the core framework UI components.
 * Test runners (Cucumber, Playwright Test) should configure the strategy on initialization.
 */
export default class Logger {
  /**
   * Default strategy simply executes the body without any reporting.
   */
  static _strategy = async (title, body) => await body();

  /**
   * Configures the logging strategy for the test runner.
   * @param {Function} strategy - Async function(title, body)
   */
  static configure(strategy) {
    Logger._strategy = strategy;
  }

  /**
   * Wraps an action in a reporting step.
   * @param {string} title - Step title for the report
   * @param {Function} body - Async callback to execute
   * @returns {Promise<*>} The return value of the callback
   */
  static async step(title, body) {
    return await Logger._strategy(title, body);
  }
}
