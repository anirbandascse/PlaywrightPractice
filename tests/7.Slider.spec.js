const { test, expect } = require('@playwright/test');

test('Select price range from 200 to 350 dollars using slider', async ({ page }) => {
    
  // 1. Navigate to the practice website
  await page.goto('https://testautomationpractice.blogspot.com/');

  // 2. Define locators for both slider handles
  // The first span represents the Min Price handle, the second represents the Max Price handle
  const minSliderHandle = page.locator('#slider-range .ui-slider-handle').nth(0);
  const maxSliderHandle = page.locator('#slider-range .ui-slider-handle').nth(1);
  const priceRangeLabel = page.locator('#amount');

  // 3. Set the Minimum Price to $200
  // Focus on the min handle and click right until it reads $200
  await minSliderHandle.focus();
  let currentPriceText = await priceRangeLabel.inputValue();
  
  while (!currentPriceText.startsWith('$200')) {
    await minSliderHandle.press('ArrowRight');
    currentPriceText = await priceRangeLabel.inputValue();
  }

  // 4. Set the Maximum Price to $350
  // Focus on the max handle and click left until it reads $350
  await maxSliderHandle.focus();
  
  while (!currentPriceText.endsWith('$350')) {
    await maxSliderHandle.press('ArrowRight');
    currentPriceText = await priceRangeLabel.inputValue();
  }

  // 5. Assert that the price range text perfectly matches '$200 - $350'
  await expect(priceRangeLabel).toHaveValue('$200 - $350');
  
  console.log(`Successfully set and verified slider range: ${currentPriceText}`);
});
