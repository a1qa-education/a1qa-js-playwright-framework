import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';

export default [
  // Base recommended JavaScript rules
  js.configs.recommended,

  // Recommended Playwright rules
  playwright.configs['flat/recommended'],

  {
    // Apply rules to all JS files
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
      }
    },
    rules: {
      // Stylistic rules
      'indent': ['error', 2, { 'SwitchCase': 1 }], // Strictly 2 spaces
      'quotes': ['error', 'single'],               // Strictly single quotes
      'semi': ['error', 'always'],                 // Strictly semicolons

      // Useful relaxations
      'no-unused-vars': 'warn',                    // Warn instead of failing on unused variables
      'playwright/no-wait-for-timeout': 'error',    // Error if someone uses hard sleeps (page.waitForTimeout)

      'playwright/no-conditional-in-test': 'off'
    }
  }
];
