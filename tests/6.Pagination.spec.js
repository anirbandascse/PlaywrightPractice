// @ts-check
const { test, expect } = require('@playwright/test');


test('Web Table - Pagination with Multiple products selection', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  await selectProducts(page, 'Television');
  await selectProducts(page, 'Router');

  });

  //Select multiple products by using function
  async function selectProducts(page, name) {
  const table = page.locator("#productTable");
  const paginationLinks = page.locator("#pagination li a");
  const pageCount = await paginationLinks.count();

  for (let i = 0; i < pageCount; i++) {
    const currentRows = table.locator('tbody tr');
    const matchedRow = currentRows.filter({ 
      has: page.locator("td"), 
      hasText: name 
    });

    if (await matchedRow.isVisible()) {
      await matchedRow.locator('input[type="checkbox"]').check();
      console.log(`Successfully checked: ${name}`);
      
      if (i > 0) {
        await paginationLinks.nth(0).click();
        await page.waitForTimeout(1000); 
      }
      return;
    }

    if (i < pageCount - 1) {
      await paginationLinks.nth(i + 1).click();
      await page.waitForTimeout(1500); 
    }
  }
  
  console.log(`Product "${name}" was not found on any page.`);
}

