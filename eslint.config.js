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
      // Stylistic rules (as requested by the reviewer)
      'indent': ['error', 2, { 'SwitchCase': 1 }], // Strictly 2 spaces
      'quotes': ['error', 'single'],               // Strictly single quotes
      'semi': ['error', 'always'],                 // Strictly semicolons
      
      // Useful relaxations
      'no-unused-vars': 'warn',                    // Warn instead of failing on unused variables
      'playwright/no-wait-for-timeout': 'warn',    // Warn if someone uses hard sleeps (page.waitForTimeout)
      
      // Disable the rule requiring no assertions in Page Objects 
      // (we handle this architecturally, and it's hard for the linter to distinguish POM from tests)
      'playwright/no-conditional-in-test': 'off' 
    }
  }
];
