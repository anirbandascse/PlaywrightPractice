const { test, expect } = require('@playwright/test');

//For JSON
const loginData = JSON.parse(JSON.stringify(require("./TestData/JSONData.json")));

//For CSV
//First install official NPM csv-parse package: npm install csv-parse
//Create CSV file

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvFilePath = path.join(__dirname, 'TestData/CSVData.csv');
/*
path.join(): A built-in Node.js tool that glues folder names together using the correct slashes (/ for Mac/Linux, \ for Windows) automatically.
__dirname: A global variable in Node.js that holds the exact, absolute path of the folder where your current test file lives.
*/

const fileContent = fs.readFileSync(csvFilePath, 'utf-8'); // use path in place of csvFilePath

const records = parse(fileContent, {
  columns: true,          // Uses the first row as object keys
  skip_empty_lines: true  // Automatically skips blank lines
});

//If you are passing data from any other file, use below process
/*
export function readCSV(filePath){
  const fileContent = fs.readFileSync(filePath);

  const records = parse(fileContent, {
    columns:true, // First row becomes keys
    skip_empty_lines:true    
  });

  return records; //Returns array of objects

};

Now from your spec file you can call this method:

const data = readCSV('provide CSV file path here');

*/

//For Excel
import * as XLSX from 'xlsx';
const excelFilePath = path.join(__dirname, 'TestData/EXCELData.xlsx');

//First install xlsx library: npm install xlsx
//Create Excel file

test('Read data from JSON', async({ page }) => {

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.locator("//input[@name='username']").fill(loginData.username); 
  await page.locator("//input[@name='password']").fill(loginData.password);
  await page.locator(".orangehrm-login-button").click();

});

test('Read data from CSV', async({ page }) => {

  for (const record of records){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("//input[@name='username']").fill(record.username); 
    await page.locator("//input[@name='password']").fill(record.password);
    await page.locator(".orangehrm-login-button").click();
  }

});

test('Read data from EXCEL', async({ page }) => {
  const workbook = XLSX.readFile(excelFilePath);
  const worksheet = workbook.Sheets["Sheet1"];
  const xlsToJson = XLSX.utils.sheet_to_json(worksheet);
  console.log(xlsToJson);

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.locator("//input[@name='username']").fill(`${xlsToJson[0].username}`); 
  await page.locator("//input[@name='password']").fill(`${xlsToJson[0].password}`);
  await page.locator(".orangehrm-login-button").click();

});

