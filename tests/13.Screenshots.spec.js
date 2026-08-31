const { test, expect } = require('@playwright/test');

test('Visible page screenshot', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.screenshot({path: 'tests/Screenshots/' + Date.now() + 'homepage.png'});

});

test('Full page screenshot', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.screenshot({path: 'tests/Screenshots/' + Date.now() + 'FullHomepage.png', fullPage: true});

});

test('Element screenshot', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.locator('#name').screenshot({path: 'tests/Screenshots/' + Date.now() + 'Locator.png'});

});

test('Capture screenshot with date and time', async ({ page }) => {
  
  await page.goto('https://testautomationpractice.blogspot.com/');

  // 1. Create a formatted timestamp string
  const now = new Date();
  const timestamp = now.toISOString()
    .replace(/T/, '_')      // Replace T with an underscore
    .replace(/\..+/, '')    // Remove milliseconds
    .replace(/:/g, '-');    // Replace colons with dashes for file safety

  // Resulting timestamp: "2026-08-26_01-54-32"

  // 2. Pass the timestamp into the screenshot path
  await page.screenshot({ path: `tests/Screenshots/homepage_${timestamp}.png` });
});

