# a1qa JavaScript Playwright Framework

This repository contains a test automation framework built with **Playwright** and **JavaScript**. It is designed for scalability, stability, and strict test isolation, utilizing a custom **Browser Wrapper**, **Fixture-based** architecture, and a highly rigorous implementation of the **Page Object Model (POM)**.

---

## 🚀 Features

* **Playwright Native:** Fast, reliable execution on Chromium, Firefox, and WebKit.
* **Strict Page Object Model:** Enforces absolute encapsulation of locators and state.
* **Element Wrappers:** Custom classes (`Button`, `TextBox`, `Label`, `Checkbox`, `Dropdown`) that encapsulate logging, reliable waits, and strict-mode error handling.
* **Smart Isolation:** Uses **Test-Scoped Fixtures** to guarantee every test runs in a completely fresh environment (clean cookies, storage, downloads, and context).
* **Lazy-Loaded Configuration:** Centralized configuration via `utils/ConfigReader.js` that evaluates at runtime, making it CI/CD and environment variable friendly.

---

## 🏗️ Project Structure

The project strictly separates the reusable technical core (`framework/`) from the business logic and tests (`tests/`).

```text
a1qa-js-playwright-framework/
├── framework/               # Core Technical Framework
│   ├── config/              # settings.json, testdata.json
│   ├── ui/
│   │   ├── browser/         # Browser.js wrapper
│   │   ├── constants/       # ElementType.js, Timeouts.js
│   │   ├── elements/        # UI Element wrappers (Button, Label, etc.)
│   │   ├── fixtures/        # Playwright test extensions
│   │   └── page/            # BasePage.js
│   └── utils/               # ConfigReader.js, FileUtils.js, FrameUtils.js
├── tests/                   # Application-Specific Specs
│   ├── pages/               # Page Objects (LoginPage, MainPage, etc.)
│   └── demo.spec.js         # Test Specifications
└── playwright.config.js     # Playwright engine configuration
```

---

## 📜 Strict Page Object Rules

This framework mandates a strict, classic approach to the Page Object pattern to ensure maximum stability and zero "flakiness". All contributors must adhere to the following rules:

1. **Selector Isolation:** All interactions with locators and selectors must happen exclusively inside Page classes. Tests (`.spec.js` files) must never contain `page.locator()` or `page.getBy...`[cite: 23].
2. **Inheritance:** Every application page class must inherit directly from `BasePage`[cite: 20, 21, 22].
3. **Unique Page Elements:** A unique element (`BaseElement` instance) must be passed to the `super()` constructor of every Page class. This element is used internally by `waitForPageToLoad()` and `isPageOpened()` to verify the page state.
4. **Encapsulated Locators:** Locators must never be exposed directly as class properties. They must be wrapped inside custom Element classes (e.g., `this.loginBtn = new Button(...)`)[cite: 20, 21, 22].
5. **Action-Oriented Methods:** Page classes should expose methods that represent user actions (e.g., `typeUsername(name)`, `clickLogin()`)[cite: 20, 21, 22].
6. **No Chaining (No Page Returns):** Page methods must never return an instance of a page (`return this` or `return new NextPage()`). Test flow and navigation are strictly controlled inside the `.spec.js` files[cite: 23].
7. **No Assertions in Pages:** Page methods must never contain test assertions (no `expect(...)` inside Page classes). All assertions belong in the test file[cite: 20, 21, 22, 23].
8. **Explicit Waits for Text:** If a test needs to verify text, the Page must provide a method that returns the text string. This method must utilize the element wrapper's `getText()` method, which explicitly waits for the element to be visible before reading its value.

---

## 📚 Developer Guide

### 1. Creating a Page Object
Follow the strict rules above when creating a new page.

```javascript
import { Button, TextBox, Label } from "#framework/ui/elements/index.js";
import BasePage from "#framework/ui/page/BasePage.js";

// Rule 2: Inherit from BasePage
export default class LoginPage extends BasePage {
  constructor(page) {
    // Rule 3: Pass a unique wrapped element to super() to identify the page
    // Rule 4: Wrap the locator inside a custom Element class (Label)
    super(new Label(page.getByText('Login Page', { exact: true }), 'Unique header'), 'Login Page');
    
    // Rule 1 & 4: Keep locators isolated in the class and encapsulated in wrappers
    this.usernameInput = new TextBox(page.getByLabel('Username'), 'Username input');
    this.loginButton = new Button(page.getByRole('button', { name: 'Login' }), 'Login button');
    this.errorMessage = new Label(page.locator('.error'), 'Error message');
  }

  // Rule 5: Methods represent clear user actions
  // Rule 6: The method returns Promise<void>, NOT an instance of another page
  async login(username) {
    await this.usernameInput.typeText(username);
    await this.loginButton.click();
  }

  // Rule 7: No assertions (expect) here. We only return the value.
  // Rule 8: Using the wrapper's getText() ensures an explicit wait before reading.
  async getErrorText() {
    return await this.errorMessage.getText(); 
  }
}
```

### 2. Writing a Test
Tests manage the flow and hold all assertions. Configuration data is loaded lazily via `ConfigReader`.

```javascript
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import LoginPage from './pages/LoginPage.js';
import ConfigReader from '#framework/utils/ConfigReader.js';

// Inject the isolated custom browser fixture
test('User can see error on invalid login', async ({ customBrowser: browser }) => {
  const testData = ConfigReader.getTestData();
  
  // Rule 1: No locators here. We interact only with the Page Object.
  const loginPage = new LoginPage(browser.page);
  
  // Verify page load using the unique element defined in the constructor
  expect(await loginPage.isPageOpened()).toBe(true);
  
  // Rule 5: Call action-oriented methods to interact with the UI
  await loginPage.login(testData.invalidUser);
  
  // Rule 7 & 8: Assertions are kept in the test, verifying the returned data explicitly
  const errorText = await loginPage.getErrorText();
  expect(errorText).toEqual(testData.invalidCredentialsMessage);
});
```

### 3. Working with iFrames
To maintain strict encapsulation (Rule 4), never extract text or interact with frames directly using raw Playwright commands. Instead, use `FrameUtils` to build a locator, and pass that locator into standard Element wrappers.

```javascript
import FrameUtils from '#framework/utils/FrameUtils.js';
import { Button } from '#framework/ui/elements/index.js';

export default class PaymentPage extends BasePage {
  constructor(page) {
    super(...);
    
    // 1. Generate the iframe locator chain using FrameUtils
    const frameLocator = new FrameUtils(page).locatorInFrames(
      ['#payment-gateway-iframe'], // Array of outer -> inner frame selectors
      'button#submit-payment'      // Target element inside the deepest frame
    );

    // 2. Wrap it in a standard Element class
    this.submitPaymentBtn = new Button(frameLocator, 'Submit Payment Frame Button');
  }

  async submitPayment() {
    await this.submitPaymentBtn.click(); // Standard waits and logs apply automatically
  }
}
```

### 4. File Downloads
Downloads are automatically isolated per-test to avoid race conditions during parallel execution. Download logic must route through `Browser.js` so it saves into the dedicated worker directory.

```javascript
// In your test:
const filePath = await browser.downloadAndSave(
  () => invoicePage.clickDownloadPdf(), // Pass the page object action as a callback
  'invoice.pdf'                         // Desired filename
);

// File is safely deleted after the test passes to save disk space
```

---

## ⚙️ Test Execution

**Run all tests in headless mode (default for CI):**
```bash
npx playwright test
```

**Run tests locally with browser UI (Headed mode):**
```bash
HEADLESS=false npx playwright test
```

**Open the interactive UI debug mode:**
```bash
npx playwright test --ui
```
