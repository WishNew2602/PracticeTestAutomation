import { test, chromium } from '@playwright/test';

test('scroll to element', async ({}) => {

  const browser = await chromium.launch();

  const context = await browser.newContext({
    recordVideo: { dir: './videos/' }
  });

  const page = await context.newPage();

  await page.goto('https://www.amazon.com/');

  await page.locator('//div/h2[text()="Bestsellers in Jewellery"]').scrollIntoViewIfNeeded();
  // const video = page.video();

  // if (video) {
  //   await video.saveAs('./videos/recordTests' + Math.random() + '.webm');
  // }
});
test.afterEach(async ({ page }) => {
  const video = page.video();

  if (video) {
    await video.saveAs('./videos/recordTests' + Math.random() + '.webm'); // ✅ correct format
  }
});