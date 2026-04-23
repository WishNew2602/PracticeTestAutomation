import{test, expect, chromium} from '@playwright/test';
// import { TestDataUtil } from '../utilities/FakeDataGen';

const records:any = [];

// const testDataUtil = new TestDataUtil();
// 

test.describe('login test for different value', async() => {

    for(const record of records){
        //[student, Password123, valid]
            test(`Login test for ${record.username} and ${record.password}`, async ({ page }) => {
            await page.goto('https://practicetestautomation.com/practice-test-login/');
            await page.locator('#username').fill(record.username);
            // const loc:Locator = page.locator('#username');
            await page.locator('#password').fill(record.password);
            console.log(`this login is ${record.isValid}`);
            await page.locator('#submit').click();

            if(record.isValid === 'valid'){
                await expect(page.getByText('Log out')).toBeVisible();
            }else if(record.isValid === 'invalid username'){
                await expect(page.locator('#error')).toBeVisible();
                await expect(page.locator('#error')).toHaveText('Your username is invalid!');
                
                const isVis = await page.locator('#error').isVisible({timeout:3000});
                const errorMessage = await page.locator('#error').textContent();
                console.log(`Error message for invalid username: ${errorMessage}`);
                expect(errorMessage).toBe('Your username is invalid!');

            } else if(record.isValid === 'invalid password'){
                await expect(page.locator('#error')).toBeVisible();
                await expect(page.locator('#error')).toHaveText('Your password is invalid!');
                const errorMessage = await page.locator('#error').textContent();
                console.log(`Error message for invalid password: ${errorMessage}`);
                expect(errorMessage).toBe('Your password is invalid!');
            }
        });
    }
});
// test.beforeEach(async () => {
//       const browser = await chromium.launch();
    
//       const context = await browser.newContext({
//         recordVideo: { dir: 'videos/' }
//       });
    
//       const page = await context.newPage();
    
// });

// test.afterEach(async ({ page }, testInfo) => {
//   const video = page.video(); 
//     if (video) {
//         let randomNum = Math.random();
//         // await video.saveAs('./videos/checkboxTestTwo' + randomNum + '.webm');
//         testInfo.attach('video', { path: './videos/checkboxTestTwo' + randomNum + '.webm', contentType: 'video/webm' });
//     }
// });
test('scroll to element', async({page}, testInfo) => {


  await test.step('open bestsellers page', async () => {
    await page.goto('https://www.amazon.in/gp/bestsellers/?ref_=nav_em_cs_bestsellers_0_1_1_2');
  });

  await test.step('scroll to jewelry section and capture bestJewelry', async (testInfo) => {
    await page.locator('//div/h2[text()="Bestsellers in Jewellery"]').scrollIntoViewIfNeeded();
    await page.screenshot({path:'./screenshot/bestJewelry.png'});
    await testInfo.attach('bestJewelry', { path: './screenshot/bestJewelry.png', contentType: 'image/png' });
  });

  await test.step('scroll and capture full screen', async (testInfo) => {
    await page.mouse.wheel(0,100);
    await page.screenshot({path:'./screenshot/fullScreen.png', fullPage: true});
    await testInfo.attach('fullScreen', { path: './screenshot/fullScreen.png', contentType: 'image/png' });
  });
    // await context.close();
    // const video = page.video(); 
    // if (video) {
    //     let randomNum = Math.random();
    //     await video.saveAs('./videos/checkboxTestTwo' + randomNum + '.mp4');
    //     await testInfo.attach('video', { path: './videos/checkboxTestTwo' + randomNum + '.mp4', contentType: 'video/mp4' });
    // }
});
test.afterEach('aftereach', async({page}, testInfo) =>{
  const video = page.video(); 
    if (video) {
        let randomNum = Math.random();
        await video.saveAs('./videos/checkboxTestTwo' + randomNum + '.mp4');
        await testInfo.attach('video', { path: './videos/checkboxTestTwo' + randomNum + '.mp4', contentType: 'video/mp4' });
    }
})
  // const searchItem = 'iphone';
        //http://127.0.0.1:5500/tests/htmlfiles/frames.html
        //https://the-internet.herokuapp.com/tables
    // await page.goto('https://www.amazon.in/gp/bestsellers/?ref_=nav_em_cs_bestsellers_0_1_1_2');

    // await page.locator('//div/h2[text()="Bestsellers in Jewellery"]').scrollIntoViewIfNeeded();
    // await page.screenshot({path:'./screenshot/bestJewelry.png'});
    // await page.screenshot.apply('./screenshot/bestJewelry.png');
    // await page.mouse.wheel(0,100);
    // await page.screenshot({path:'./screenshot/fullScreen.png', fullPage: true});
    // await page.video().saveAs('./videos/checkboxTestTwo.mp4');
    // const bestJewlery = page.locator('//div/h2[text()="Bestsellers in Jewellery"]');
    
    // let sTime = 0;
    // let scrollTimes:number = 50;
    // while(!(bestJewlery.isVisible()) && sTime < scrollTimes){
    //     await page.mouse.wheel(0,100);
    //     console.log(sTime++);
    // }
    














    // await page.locator('//span[contains(text(),"Best Sellers in Computers & Accessories")]').scrollIntoViewIfNeeded();
    // await page.locator("//h2/button[contains(@data-bs-target, 'collapseTwo')]").click();
    // await page.locator("//a[@href='selenium_automation_practice.php']").click();
    // await page.locator('//select[@id="state"]').scrollIntoViewIfNeeded();
    // await page.mouse.wheel(0, 100);
    // await page.mouse.wheel(0, 100);

    

















    // await page.locator("//select[@id='state']").selectOption('NCR');
    // await page.locator("//select[@id='state']").selectOption({index: 3});
    // await page.locator("//select[@id='state']").selectOption(['NCR', 'Maharastra']);
    // const selectedState = await page.locator("//select[@id='state']").inputValue();
    // console.log(selectedState);
    // const selectedStateText = await page.locator("//select[@id='state']").locator('option:checked').textContent();
    // console.log(selectedStateText);
    // await page.locator("//select[@id='state']").


    // await page.locator('//span[contains(text(),"Main Level 1")]/preceding-sibling::input').check();
    // await page.locator('//a[@href="radio-button.php"]').click();
    // await page.locator('//input[@value="igottwo"]').check();
    // await expect(page.locator('//input[@value="igottwo"]')).toBeChecked();
    // await expect(page.locator('//a[@href="radio-button.php"]')).toBeChecked();
// });
