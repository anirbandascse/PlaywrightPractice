// @ts-check
import { test, expect } from '@playwright/test';

test.skip('Web Table - Single product selection', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  const table = await page.locator("#productTable");

  const headers = await table.locator('thead tr th');
  const headerTexts = await headers.allTextContents(); 

  console.log("Table headers are: ", headerTexts);

  const columns = headers;
  console.log("Number of columns: " + await columns.count());

  const rows = await table.locator('tbody tr');
  console.log("Number of rows: " + await rows.count());

  //Select a particular checkbox. For Smartwatch
  const matchedRow = rows.filter({
    has: page.locator("td"),
    hasText: "Smartwatch"
  })

  await matchedRow.locator('input').check();

  await page.waitForTimeout(10000);



  });

test.skip('Web Table - Multiple products selection', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  const table = await page.locator("#productTable");

  const headers = await table.locator('thead tr th');
  const headerTexts = await headers.allTextContents(); 

  console.log("Table headers are: ", headerTexts);

  const columns = headers;
  console.log("Number of columns: " + await columns.count());

  const rows = await table.locator('tbody tr');
  console.log("Number of rows: " + await rows.count());

  await selectProducts(rows, page, 'Smartphone');
  await selectProducts(rows, page, 'Laptop');
  await selectProducts(rows, page, 'Tablet');

  });

  //Select multiple products by using function
  async function selectProducts(row, page, name){
  const matchedRow = row.filter({
    has: page.locator("td"),
    hasText: name
  })
  
  await matchedRow.locator('input').check();
  await page.waitForTimeout(2000);

}

test('Web Table - Get table data', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  const table = await page.locator("#productTable");

  const headers = await table.locator('thead tr th');
  const headerTexts = await headers.allTextContents(); 

  console.log("Table headers are: ", headerTexts);

  const columns = headers;
  console.log("Number of columns: " + await columns.count());

  const rows = await table.locator('tbody tr');
  console.log("Number of rows: " + await rows.count());

  for(let i = 0; i < await rows.count(); i++){
    const row = rows.nth(i);
    const tds = row.locator('td');

    for(let j = 0; j < await columns.count(); j++){
      console.log(await tds.nth(j).textContent());
    }
  }

  });
