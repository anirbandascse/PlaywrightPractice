const { test, expect } = require('@playwright/test');

test.skip('Date picker - Passing date directly', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.fill('#datepicker', '03/12/2026');
  await page.waitForTimeout(2000);
});


test('Date picker - Calender dropdown', async ({ page }) => {
    
  await page.goto('https://testautomationpractice.blogspot.com/');

  const year = "2027", month = "July", date = "27";

  await page.click('#datepicker');

  while(true){
    const currentYear = await page.locator('.ui-datepicker-year').textContent();
    const currentMonth = await page.locator('.ui-datepicker-month').textContent();

    if(currentYear == year && currentMonth == month){
      break;
    }

    await page.locator("[title = 'Next']").click();

  }
  await page.click(`//a[@class = 'ui-state-default'][text() = '${date}']`);
  await page.waitForTimeout(10000);

  /*Using Array and loop

  const dates = await page.$$("//a[@class = 'ui-state-default']");

  for(const d of dates){
  if(await d.textContent() == date){
  await d.click();
  break

  }
  
  }

  */
});
