// @ts-check
import { test, expect } from '@playwright/test';

test.skip('Normal alert', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();

  })

  await page.click("//button[normalize-space() = 'Simple Alert']");
  await page.waitForTimeout(5000);

  });

test.skip('Confirmation alert with Ok and Cancel button', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('confirm');
    expect(dialog.message()).toContain('Press a button!');
    await dialog.accept();

  })

  await page.click("//button[normalize-space() = 'Confirmation Alert']");
  await expect(page.locator("#demo")).toHaveText("You pressed OK!");
  await page.waitForTimeout(5000);

  });

test('Prompt alert with Textbox, Ok and Cancel button', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('prompt');
    expect(dialog.message()).toContain('Please enter your name:');
    expect(dialog.defaultValue()).toContain("Harry Potter");

    await dialog.accept('Anirban');

  })

  await page.click("//button[normalize-space() = 'Prompt Alert']");
  await expect(page.locator("#demo")).toHaveText("Hello Anirban! How are you today?");
  await page.waitForTimeout(5000);

  });

