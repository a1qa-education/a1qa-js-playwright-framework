import { test } from '@playwright/test';

/**
 * A safe wrapper around Playwright's `test.step()`.
 * When running inside the Playwright Test runner, this delegates to `test.step()` for proper reporting.
 * When running outside (e.g., from Cucumber), it simply executes the callback directly — no error, no overhead.
 *
 * @param {string} title - Step title for the report
 * @param {Function} body - Async callback to execute
 * @returns {Promise<*>} The return value of the callback
 */
export async function step(title, body) {
  try {
    return await test.step(title, body);
  } catch (error) {
    if (error.message?.includes('can only be called from a test')) {
      return await body();
    }
    throw error;
  }
}
