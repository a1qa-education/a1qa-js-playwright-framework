# Capstone Project: Legacy Monolith Modernization

## Overview

The purpose of this assignment is to modernize the legacy Steam E2E automation test while preserving the existing business logic and validation behavior.

The original implementation (`SteamLegacyTest`) is a monolithic, difficult-to-maintain test containing unstable locators, duplicated logic, and custom synchronization mechanisms. The goal is to refactor the solution into a modern, maintainable, and reliable automation framework without changing the original test scenario.

---

## Original Test Case (Must Remain Unchanged)

### Test Case: STEAM-TC-001

**Title:** Filtering by platform/mode and validating ascending price sorting (Lowest Price).

**Priority:** High

**Preconditions:**
- Browser launched in incognito mode (clean session).
- Navigated to https://store.steampowered.com/.
- Interface language set to English.

| Step | Action | Expected Result |
|------|---------|----------------|
| 1 | Enter "Action" into the main search bar and press Enter. | Search results page opens. Game list is not empty. |
| 2 | In the right sidebar (Narrow by OS), check the Windows checkbox. | Checkbox is checked. Results update dynamically. |
| 3 | In the right sidebar (Narrow by number of players), check the Co-op checkbox. | Checkbox is checked. Results update with both filters applied. |
| 4 | Click Sort by dropdown and select "Lowest Price". | List updates. Games are ordered cheapest to most expensive. |
| 5 | Extract Game Title + Final Price for the first 10 items. | Data extracted. Free games read as 0.00. Discounted games use final price only. |
| 6 | Verify the collected array of 10 prices is sorted in ascending order. | Each price is ≥ the previous one. |

---

## Assignment Goals

### Phase 1: AI Code Audit

Perform an AI-assisted review of the legacy implementation and identify:

- Architectural issues
- Anti-patterns
- Code smells
- Flaky synchronization
- Brittle locators
- Maintainability concerns

All findings must be documented in:

```text
PROMPTS.md
```

### Phase 2: Decoupling & Architecture

Refactor the monolithic implementation using Page Object Model.

Recommended structure:

```text
a1qa-js-playwright-framework/
├── .vscode/                 # Editor settings for automatic linting on save
├── framework/               # Core Technical Framework
│   ├── config/              # testdata.json (Non-sensitive structural data)
│   ├── ui/
│   │   ├── browser/         # Browser.js wrapper (Single state manager)
│   │   ├── constants/       # ElementType.js, Timeouts.js
│   │   ├── elements/        # UI Element wrappers (Button, Label, ElementsList, etc.)
│   │   ├── fixtures/        # Playwright test extensions (browser.fixture.js)
│   │   └── page/            # BasePage.js
│   └── utils/               # ConfigReader.js, EnvProvider.js, FileUtils.js, FrameUtils.js
├── tests/                   # Application-Specific Specs
│   ├── pages/               # Page Objects (LoginPage, MainPage, etc.)
│   └── steam_legacy.spec.js # Test Specifications
├── .env.example             # Template for required environment variables
├── eslint.config.js         # ESLint v10 Flat Config rules
└── playwright.config.js     # Playwright engine and multi-browser configuration
└── PROMPTS.md
```

Requirements:

- Separate page interactions into Page Objects
- Move test data outside test logic
- Extract reusable utilities
- Preserve existing business validations

### Phase 3: Stabilization & Refactoring

Address all issues identified during the audit:

- Replace unstable locators
- Remove hardcoded waits
- Use native Playwright synchronization
- Simplify data extraction logic
- Refactor custom sorting logic
- Improve readability and maintainability

---

## Deliverables

### 1. Modernized Project Structure

- Tests
- Page Objects
- Utils
- Test Data

### 2. Stable Automated Test

The refactored test must reliably validate:

- Search functionality
- OS filtering
- Player-count filtering
- Price sorting

### 3. PROMPTS.md

Must contain:

- AI audit prompts
- Audit results
- Refactoring prompts
- Architecture recommendations
- Stabilization notes

---

## Definition of Done

- Original STEAM-TC-001 business scenario preserved
- Test successfully refactored into POM architecture
- Test data extracted from test logic
- Utilities separated into reusable modules
- Hardcoded waits removed
- Stable locators implemented
- Sorting validation preserved
- AI review documented in PROMPTS.md
- Test executes reliably and consistently

---

## Technologies

- JavaScript
- Playwright
- Node.js
