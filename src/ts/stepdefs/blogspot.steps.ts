import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "playwright";


let browser: Browser;
let page: Page;

 Given('I navigate to {string}', async (url) =>{
           
        browser = await chromium.launch({ headless: false });
        page = await browser.newPage();
        await page.goto(url);
});

When('i need to select date as {string}', async (date) => {
    const dateval:string[] = date.split('/');
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
});