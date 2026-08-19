const { test, expect } = require('@playwright/test');

test('Open two different sites in two different tabs', async({ browser }) => {
  const context = await browser.newContext();

  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const noOfPages = context.pages(); //Capture all active window pages inside the context
  console.log("Number of pages created: " + noOfPages.length);

  await page1.goto("https://facebook.com/");
  await page2.goto("https://twitter.com/");

});

test('Open new single tab after clicking link', async({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
  //await page.pause();
  await page.locator("[href*='documents-request']").click();

  /*
   1. To move focus in tabbed window or new window , we need to use EVENT LISTENER and BROWSER CONTEXT.
   2.  EVENT LISTENER cannot be put before the click as the event of opening the page on clicking has not happened.
   3.  EVENT LISTENER cannot be put after the click has happened.What will it listen to as the event has already happened.
   4. The  EVENT LISTENER and the action of click which performs the event has to happen in parallel. 
   5. Right now thw JS has been made synchronous using ASYNC -AWAIT.
   6. To make it asynchronous for this event listener and click event , we need to use PROMISE.
   7. PROMISE has three stages:
    a. pending - means the step is pending and under that circumstance, the script might go further and may show failure.
    b. rejected - means the step is rejected and the script will show failure.
    c. fulfilled - means the step has fulfilled its promise(work) and the script runs without any problem.
   8. The steps (event listener and the click action) which needs to work in asynchronous manner, should be put 
   as an array steps in all() method. Promise has this all() methods.
   9. Return type of this all() method is an array
   10. In this scenario clicking on the link opens ONE TAB, so using all() method here will return an array with one element
     const [one element, second element, thrid element] = Promise.all(Event Listner, click action)

  */
  //newPage = is the context of the new tab window opened up on clicking the link
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //Event Listner
    page.locator("[href*='documents-request']").click(),
  ]);

  //To get the text in RED colur from the tabbed window
  const textInTabbedWindow = await newPage.locator(".red").textContent();

  //Split the text "Please email us at mentor@rahulshettyacademy.com with below template to receive response" to get rahulshettyacademy
  const splitText = textInTabbedWindow.split("@"); //rahulshettyacademy.com with below template to receive response" to get rahulshettyacademy
  //splitText[1] - rahulshettyacademy.com with below template to receive response" to get rahulshettyacademy
  const splitText1 = splitText[1].split(" ");
  //splitText1[0] - rahulshettyacademy.com
  const splitText2 = splitText1[0].split(".");
  //splitText2[0] - rahulshettyacademy
  console.log(splitText2[0]);

  //Move the focus to landing page and type in the username field
  //Type in the username field
  await page.locator("#username").fill(splitText2[0]);

  //Get the text filled in username field
  console.log(await page.locator("#username").textContent()); /* This wont print anything as we are manipulating DOM and entering new value in the Username text field at runtime
                                                                 This will only work when page is loaded and DOM is not manipulated */

  console.log(await page.locator("#username").inputValue()); //This will return as this will check for input value

});


// test('Handle multiple concurrent pop-ups', async ({ page }) => {
//   await page.goto('https://example.com');

//   // 1. Set up listeners for multiple incoming pop-ups BEFORE clicking
//   const popup1Promise = page.waitForEvent('popup');
//   const popup2Promise = page.waitForEvent('popup');

//   // 2. Trigger the action that opens both windows at once
//   await page.getByRole('button', { name: 'Launch All Dashboards' }).click();

//   // 3. Resolve both promises concurrently
//   const [popup1, popup2] = await Promise.all([
//     popup1Promise,
//     popup2Promise
//   ]);

//   // 4. Capture details to identify which window is which
//   const title1 = await popup1.title();
//   const title2 = await popup2.title();

//   console.log(`Pop-up 1 Title: ${title1}`);
//   console.log(`Pop-up 2 Title: ${title2}`);

//   // 5. Route interactions to the correct window based on title/URL
//   if (title1.includes('Analytics')) {
//     await popup1.bringToFront(); // Optional: bring to visual focus
//     await popup1.getByRole('button', { name: 'Download Report' }).click();
    
//     // Switch to the other window in the background
//     await popup2.getByPlaceholder('Enter Notes').fill('Analytics looked good.');
//   } else {
//     await popup2.bringToFront();
//     await popup2.getByRole('button', { name: 'Download Report' }).click();
    
//     await popup1.getByPlaceholder('Enter Notes').fill('Analytics looked good.');
//   }

//   // 6. Clean up: close pop-ups to free up resources
//   await popup1.close();
//   await popup2.close();
// });



// test('Handle dynamic number of pop-ups', async ({ context, page }) => {
//   await page.goto('https://example.com');

//   // Track the initial pages in the context
//   const baselinePagesCount = context.pages().length;

//   // Trigger the multi-window launch
//   await page.getByRole('button', { name: 'Open All Alerts' }).click();

//   // Wait for the total pages in the context to stabilize (e.g., expecting 3 windows total)
//   await expect.poll(() => context.pages().length).toBeGreaterThan(baselinePagesCount);

//   // Retrieve all windows now inside the context
//   const activeWindows = context.pages();

//   // Loop through and handle each window dynamically
//   for (const win of activeWindows) {
//     // Skip the main page where we started the test
//     if (win === page) continue;

//     const currentUrl = win.url();
    
//     // Perform targeted operations depending on the pop-up destination
//     if (currentUrl.includes('error-logs')) {
//       await win.locator('#ack-button').click();
//       await win.close(); // Close immediately after acting
//     }
//   }
// });
