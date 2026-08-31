const { test, expect, devices } = require('@playwright/test');


test.use({...devices['iPhone 15 Pro Max']})
test('Run test in Apple device', async({ page }) => {

  await page.goto("https://facebook.com");
  await page.waitForTimeout(2000);

});

//test.use({...devices['Galaxy S24']})
test.skip('Run test in Android device', async({ page }) => {

  await page.goto("https://facebook.com");
  await page.waitForTimeout(2000);

});

//This is used for desktop devices as well
//test.use({...devices['Desktop Safari']})
test.skip('Run test in Desktop device', async({ page }) => {

  await page.goto("https://facebook.com");
  await page.waitForTimeout(2000);

});