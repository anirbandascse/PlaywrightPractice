// @ts-check
import { test, expect } from '@playwright/test';

test('Locating single element', async ({ page }) => {

  await page.goto("https://demoblaze.com/");

  //await page.locator('id = login2').click();
  await page.click('id=login2');

  //await page.locator('#loginusername').fill("ABC");
  await page.fill('#loginusername', 'ABC');

  });


test('Locating multiple elements', async ({ page }) => {

  await page.goto("https://demoblaze.com/");

  const links = await page.$$('a');
  
  for(const link of links){
    const linkText = await link.textContent();
    console.log("Link: " + linkText);
  }

  });

test.only('Locating element using Playwright specific locators', async ({ page }) => {

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");


  //<img data-v-17f5fb62="" src="/web/images/ohrm_branding.png?v=1783336755185" alt="company-branding">
  const logo = await page.getByAltText('company-branding');
  await expect(logo).toBeVisible();

  //<input data-v-1f99f73c="" class="oxd-input oxd-input--active" name="username" placeholder="Username" autofocus="">
  await page.getByPlaceholder("Username").fill("Admin");

  //<input data-v-1f99f73c="" class="oxd-input oxd-input--active" type="password" name="password" placeholder="Password">
  await page.getByPlaceholder("Password").fill("admin123");

  //<button data-v-10d463b7="" data-v-0af708be="" type="submit" class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"><!----> Login <!----></button>
  await page.getByRole('button', { name : 'Login'}).click();

  //<span data-v-bdd6d943="" class="oxd-userdropdown-tab"><img data-v-bdd6d943="" alt="profile picture" class="oxd-userdropdown-img" src="/web/index.php/pim/viewPhoto/empNumber/7"><p data-v-bdd6d943="" class="oxd-userdropdown-name">Paulo Pontes</p><i data-v-bddebfba="" data-v-bdd6d943="" class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"></i></span>

  const profileName = await page.locator(".oxd-userdropdown-tab p").textContent();
  console.log(profileName);
  //await page.pause();
  await expect(page.locator(".oxd-userdropdown-tab p")).toContainText(`${profileName}`);

  //getByLabel()
  //getByTitle()
  //getByTestId()



  });