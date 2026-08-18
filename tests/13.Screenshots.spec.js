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
