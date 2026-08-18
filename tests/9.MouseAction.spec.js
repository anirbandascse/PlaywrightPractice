const { test, expect } = require('@playwright/test');

test.skip('Mouse action - hover', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.getByText('Point Me').hover();
  await page.waitForTimeout(5000);
});


test.skip('Mouse action - double click', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.getByText('Copy Text').dblclick();
  await expect(page.locator('#field2')).toContain('Hello World!');
  await page.waitForTimeout(5000);
});


test.skip('Mouse action - right click', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.getByText('Copy Text').click({button: 'right'});  
  await page.waitForTimeout(5000);
});


test('Mouse action - drag and drop', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  const source = await page.locator('#draggable p');
  const target = await page.locator('#droppable p');

  //Option 1
  await source.hover()
  await page.mouse.down();

  await target.hover()
  await page.mouse.up();

  //Option 2
  //await source.dragTo(target);


  await page.waitForTimeout(5000);
});