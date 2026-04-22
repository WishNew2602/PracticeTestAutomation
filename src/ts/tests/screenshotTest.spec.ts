import {test, chromium, TestInfo} from '@playwright/test';

//chromium is an browser engine behind edge and chrome browsers.
test('screenshot test', async ({},testInfo) => {

    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {dir:'./videos'}
    });
    const page = await context.newPage();

    await page.goto('https://the-internet.herokuapp.com');
    await page.locator('//a[text()="Sortable Data Tables"]').click();
    await page.waitForLoadState('domcontentloaded');

    await page.screenshot({path:'./screenshots/heroukotable.png'}); //screenshot

    testInfo.attach('tablescreenshot', {path:'./screenshots/heroukotable.png', contentType:'image/png'});
    //if you want save video you need close the context or setup should be doe in context creation
});