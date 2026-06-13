Automation Exercise Playwright SQA Framework

This is a portfolio-ready hybrid UI/API automation framework built with Playwright and TypeScript for the Automation Exercise e-commerce practice website.

Application Under Test

https://automationexercise.com

Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model
- GitHub Actions CI
- HTML Report
- Screenshots on failure
- Videos on failure
- Trace files on failure

Test Coverage

UI Tests

- TC-001: Home page loads successfully
- TC-002: Register a new user with valid data
- TC-003: Login with valid credentials
- TC-004: Login with invalid credentials
- TC-005: Logout successfully
- TC-006: View all products page
- TC-007: Search for a product
- TC-008: Open product details page
- TC-009: Filter products by category
- TC-010: Filter products by brand
- TC-011: Add single product to cart
- TC-012: Add multiple products to cart
- TC-013: Remove product from cart
- TC-014: Proceed to checkout as logged-in user
- TC-015: Verify order review details before placing order
- TC-016: Submit contact form

API Tests

- API-001: Get all products list
- API-002: Verify product response structure
- API-003: Verify unsupported method for products list
- API-004: Get all brands list
- API-005: Verify brand response structure
- API-006: Verify unsupported method for brands list
- API-007: Search product by valid keyword
- API-008: Verify missing search parameter error
- API-009: Verify login with valid credentials
- API-010: Verify missing login parameters error
- API-011: Create and delete user account

Test Execution Count

- 16 UI test cases x 2 browsers = 32 UI test executions
- 11 API test cases x 1 API project = 11 API tests
- Total = 43 automated test executions

npm install
npx playwright install
npm test
npm run test:ui
npm run test:api
npm run test:smoke
npm run test:regression
npm run test:headed
npm run report.
Run intentional failure tests for defect evidence:
npm run test:defects
``