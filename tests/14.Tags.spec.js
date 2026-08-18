const { test, expect } = require('@playwright/test');

test('First Test Case @smoke', async ({ page }) => {
  console.log("First Test Case");

});

test('Second Test Case @regression', async ({ page }) => {
  console.log("Second Test Case");

});

test('Third Test Case @smoke @regression', async ({ page }) => {
  console.log("Third Test Case");

});

// npx playwright test tests/14.Tags.spec.js --grep @smoke --grep-invert @regression - Only @smoke will run