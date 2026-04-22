import { test, chromium } from '@playwright/test';

test('tab example test', async ( {} ) => {

    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo : {dir:'./videos'}
    });
    const page = await context.newPage();
    await page.goto('https://www.tutorialspoint.com/selenium/practice/browser-windows.php');

    // await page.getByText('New Tab').click();

    //selenium windowHandle

    //event driven even loop

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            await page.getByText('New Tab').click()
        ]
    );
    //[newPage,undefined]
    await page.locator('//a[@title="back to Selenium Tutorial"]').click();

    const allPages = context.pages();

    await allPages[0].bringToFront();
    await allPages[1].bringToFront();
    await allPages[2].bringToFront();

    await page.bringToFront();
    await newPage.close();

});