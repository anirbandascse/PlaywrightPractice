const { test, expect } = require('@playwright/test');

const loginData = JSON.parse(JSON.stringify(require("./TestData/JSONData.json")));

test('Read data from JSON', async({ page }) => {

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.locator("//input[@name='username']").fill(loginData.username); 
  await page.locator("//input[@name='password']").fill(loginData.password);
  await page.locator(".orangehrm-login-button").click();

});

