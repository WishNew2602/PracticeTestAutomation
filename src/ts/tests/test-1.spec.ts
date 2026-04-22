import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://www.spicejet.com/');
  await page.getByTestId('to-testID-destination').getByRole('textbox').click();
  await page.getByText('Pandit Deen Dayal Upadhyay').click();
  await page.getByTestId('undefined-month-March-2026').getByText('21', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^1 Adult$/ }).first().click();
  await page.getByTestId('Adult-testID-plus-one-cta').click();
  await page.getByTestId('Children-testID-plus-one-cta').click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').nth(4).click();
  const page1 = await page1Promise;
  await page.locator('div').filter({ hasText: /^INR$/ }).first().click();
  await page.locator('div').filter({ hasText: /^INR$/ }).nth(2).click();
  await page.locator('circle').nth(4).click();
  await page.getByTestId('home-page-flight-cta').click();
  await page.locator('.css-1dbjc4n.r-1tf5bf9 > .css-1dbjc4n.r-1awozwy').click();
  await page.locator('div').filter({ hasText: /^Continue$/ }).nth(1).click();
  await expect(page.getByText('Unfortunately, there are no')).toBeVisible();
  await expect(page.locator('#list-results-section-0')).toContainText('Search again');
  await page.locator('div').filter({ hasText: /^Modify Search$/ }).nth(3).click();
  await page.goto('https://www.spicejet.com/search?from=DEL&to=AGR&tripType=1&departure=2026-03-23&adult=2&child=0&srCitizen=0&infant=0&currency=INR&specialCategory=F&redirectTo=/');
  await expect(page.getByTestId('application-id')).toMatchAriaSnapshot(``);
  await page2.locator('#first_name').click();
  await page2.locator('#first_name').fill('Vishnuvardhan');
});