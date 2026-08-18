const { test, expect } = require('@playwright/test');

test.beforeEach(async() =>{
  console.log("Before Each hook....");
});

test.afterEach(async() =>{
  console.log("After Each hook....");
});

test.beforeAll(async() =>{
  console.log("Before All hook....");
});

test.afterAll(async() =>{
  console.log("After All hook....");
});



test.describe("Group 1", () => {
  console.log("Group 1");

  test('Test Case 1', async ({ page }) => {
  console.log("Test Case 1");

});

  test('Test Case 2', async ({ page }) => {
  console.log("Test Case 2");

});

});

test.describe("Group 2", () => {
  console.log("Group 2");

  test('Test Case 3', async ({ page }) => {
  console.log("Test Case 3");

});

  test('Test Case 4', async ({ page }) => {
  console.log("Test Case 4");

});
  
});