import{test} from '@playwright/test';
import { chromium } from '@playwright/test';

test.skip('date picker bootstrap', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const dateval:string[] = '12/October/2025'.split('/');
    const day = dateval[0];
    const month = dateval[1];
    const year = dateval[2];

    console.log(day, month, year)
    await page.click('#datepicker');

    while(true){

        const selectedMonth = await page.locator('.ui-datepicker-month').innerText();
        const selectedYear = await page.locator('.ui-datepicker-year').innerText();

        if(selectedMonth === month && selectedYear === year){
            break;
        }
        await page.locator('.ui-datepicker-prev').click();
    }

    const allDays = await page.locator('.ui-datepicker-calendar tr td').all();

    for(let dt of allDays){
        const selectedDay = await dt.innerText();
        if(selectedDay === day){
            await dt.click();
            console.log('we found the day')
            break;
        }
    }

});


test('date picker jQuery', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const dateval:string[] = '12/Oct/2025'.split('/');
    const day = dateval[0];
    const month = dateval[1];
    const year = dateval[2];

    console.log(day, month, year)
    await page.click('#txtDate');

    await page.locator('.ui-datepicker-year').selectOption(year);
    await page.locator('.ui-datepicker-month').selectOption(month);


    const allDays = await page.locator('.ui-datepicker-calendar tr td').all();

    for(let dt of allDays){
        const selectedDay = await dt.innerText();
        if(selectedDay === day){
            await dt.click();
            console.log('we found the day')
            break;
        }
    }

    await page.locator('#start-date').type('10022026');

    //fill - fill enters all the data into text box at a time
    //type - enters the data character by character

});
           