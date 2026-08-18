const { test, expect } = require('@playwright/test');

let username, page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.locator("//input[@name='username']").fill("Admin"); 
  await page.locator("//input[@name='password']").fill("admin123");
  await page.locator(".orangehrm-login-button").click();
  username = await page.locator(".oxd-userdropdown-name").textContent();

});

test.afterEach(async() => {     //No need to pass page fixture as it is created in beforeEach

  await page.getByRole('listitem').filter({ hasText: username }).locator('i').click();
  //await page.getByRole('listitem').filter({ hasText: `${userName}` }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

});

test('Hooks Test - 1', async () => {      //No need to pass page fixture as it is created in beforeEach
  console.log("Inside Hooks Test - 1");
  await page.locator("//button[@title= 'Assign Leave']").click();  

});

test('Hooks Test - 2', async () => {       //No need to pass page fixture as it is created in beforeEach
  console.log("Inside Hooks Test - 2");
  await page.locator("//button[@title= 'Leave List']").click();
  

});
