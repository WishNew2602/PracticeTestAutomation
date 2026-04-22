import { test, expect } from '@playwright/test';

test('Handle the Iframe', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/tests/htmlfiles/frames.html');

  const topSectionFrame = page
    .frameLocator('frame[name="main"]')
    .frameLocator('frame[name="topsection"]');

  await expect(topSectionFrame.locator('h3')).toHaveText('Nested Frame: Top Section');

  const headerVal = await topSectionFrame.locator('h3').textContent();
  console.log('Top section header:', headerVal);
});