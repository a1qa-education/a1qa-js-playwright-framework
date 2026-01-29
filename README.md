# a1qa JavaScript Playwright Framework

This repository contains a test automation framework built with **Playwright** and **JavaScript**. It is designed for scalability, stability, and strict test isolation, utilizing a custom **Browser Wrapper** and **Fixture-based** architecture.

The framework adheres to the **Page Object Model (POM)** pattern and uses **Element Wrappers** to standardize UI interactions.

---

## 🚀 Features

* **Playwright Native:** Fast, reliable execution on Chromium, Firefox, and WebKit.
* **Custom Browser Wrapper:** A simplified interface (`Browser.js`) for managing tabs, windows, and navigation, preventing state pollution.
* **Smart Isolation:** Uses **Test-Scoped Fixtures** to guarantee that every test runs in a completely fresh environment (clean cookies, storage, and context).
* **Element Wrappers:** Custom classes (`Button`, `TextBox`, `Label`, etc.) that encapsulate logging and smart waits.
* **Configurable:** Centralized configuration via `utils/ConfigReader.js` that works with  and `playwright.config.js`.

---

## 🛠️ Prerequisites

* **Node.js**: Version 18.x or higher
* **NPM**: (bundled with Node.js)
* **IDE**: Visual Studio Code (recommended) with the *Playwright Test for VSCode* extension.

---

## 📥 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/a1qa-education/a1qa-js-playwright-framework.git
    cd a1qa-js-playwright-framework
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```
---

## 🏗️ Project Structure

The project is structured into two main directories: `framework/` (core logic) and `tests/` (specifications).

```text
a1qa-js-playwright-framework/
├── framework/
│   ├── config/
│   │   ├── settings.json      # Environment configuration
│   │   └── testdata.json      # Static test data
│   ├── ui/
│   │   ├── browser/
│   │   │   └── Browser.js     # Core wrapper for Page/Context management
│   │   ├── constants/
│   │   │   ├── ElementTypes.js
│   │   │   └── Timeouts.js
│   │   ├── elements/          # Element Wrappers
│   │   │   ├── helpers/       # Helper states (e.g., elementState.js)
│   │   │   ├── BaseElement.js
│   │   │   ├── Button.js
│   │   │   ├── TextBox.js
│   │   │   ├── Checkbox.js
│   │   │   ├── Dropdown.js
│   │   │   └── Label.js
│   │   ├── fixtures/
│   │   │   └── browser.fixture.js # Fixture to inject the isolated Browser
│   │   └── pages/
│   │   │   └── BasePage.js    # Parent class for all Page Objects
│   └── utils/
│       ├── ConfigReader.js
│       ├── FrameUtils.js
│       └── locatorHelper.js
├── tests/                     # Test Specifications
│   ├── pages/                 # Project-specific Page Objects
│   │   └── MainPage.js
│   └── demo.spec.js           # Example Test File
├── playwright.config.js       # Main Playwright configuration
└── package.json               # Dependencies and Scripts
