const { test, expect } = require('@playwright/test');

test('Upload file/files', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  //Single File upload
  await page.locator('#singleFileInput').setInputFiles("tests/Files/File1.txt");
  await page.getByText('Upload Single File').click();

  //Multiple Files upload
  await page.locator('#multipleFilesInput').setInputFiles([
    "tests/Files/File1.txt",
    "tests/Files/File1.txt"
  ]);
  await page.getByText('Upload Multiple Files').click();

});
