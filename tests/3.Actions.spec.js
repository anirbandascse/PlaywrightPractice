// @ts-check
import { test, expect } from '@playwright/test';

test('Action on textbox', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");
  
  expect(await page.locator("#name").isVisible()).toBeTruthy();
  await page.locator("#name").fill("abc");

  });


test('Action on radio button', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  expect(await page.locator("#male").isVisible()).toBeTruthy();
  await page.locator("#male").click();

  await page.locator("#female").check();
  expect(await page.locator("#female").isChecked()).toBeTruthy()
  expect(await page.locator("#male").isChecked()).toBeFalsy(); //await expect(page.locator("#male")).not.toBeChecked();



  });

test('Action on checkbox', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  await page.locator("input[id = 'thursday'][type = 'checkbox']").check();
  expect(page.locator("input[id = 'thursday'][type = 'checkbox']").isChecked).toBeTruthy();


  const daysLocators = [
    "input[id = 'tuesday'][type = 'checkbox']",
    "input[id = 'wednesday'][type = 'checkbox']",
    "input[id = 'thursday'][type = 'checkbox']",
    "input[id = 'friday'][type = 'checkbox']",

  ];

  for(let locator of daysLocators){

    if(await page.locator(locator).isChecked()){
      await page.locator(locator).uncheck();
    }
    else{
    await page.locator(locator).check();
    }
  }

  await page.waitForTimeout(5000);



  });

test('Action on dropdown', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  await page.locator("#country").selectOption('India'); //Visible text
  //await page.locator("#country").selectOption({label: 'India'});
  //await page.locator("#country").selectOption({value: 'India'});
  //await page.locator("#country").selectOption({index: 1});

  //await page.locator("#country", 'India');

  //Get count
  const dropdownValueCount = page.locator("#country>option");
  await expect(dropdownValueCount).toHaveCount(10);

  //Collect all the dropdown values
  const dropdownTexts = await page.locator("#country>option").allTextContents();

  for(let value of dropdownTexts){
    console.log(value);
  }

  /* Another way to collect all the dropdown values

  const allOptions = await page.$$("#country>option");

  for(let options of allOptions){
  console.log(await option.textContent());
  }

  */

  });

test('Action on multi select dropdown', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  await page.selectOption('#colors', ['Blue', 'Red', 'Green', 'White']);

  await page.waitForTimeout(5000);

  });

test.only('Action on auto complete select dropdown', async ({ page }) => {
  // 1. Navigate to the website
  await page.goto("https://redbus.in");

  // 2. Type into the source input field
  const srcInput = page.locator("input#srcinput");
  await srcInput.pressSequentially('kolkata', { delay: 100 });

  // 3. Find the suggestion inside the list using clean Playwright locator chaining
  await page.getByRole('button', { name: 'Esplanade, Kolkata, Kolkata,' }).click();
  await page.waitForTimeout(5000);
  
});