import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ignores: ['test-results/', 'playwright-report/', 'blob-report/', 'playwright/.cache/']
  },

  // Base recommended JavaScript rules
  js.configs.recommended,

  // Recommended Playwright rules
  playwright.configs['flat/recommended'],

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        // Available inside locator.evaluate() / page.evaluate() callbacks, which run in the browser
        window: 'readonly',
        document: 'readonly',
      }
    },
    rules: {
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],

      'no-unused-vars': 'warn',
      'playwright/no-wait-for-timeout': 'error',

      'playwright/no-conditional-in-test': 'off'
    }
  }
];
