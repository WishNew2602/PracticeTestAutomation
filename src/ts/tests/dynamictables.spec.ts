import {test,expect, Locator} from '@playwright/test';

test('dynamic table test', async ({ page }) => {

    page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

    //Jonas Alexander
    // page.waitForSelector();

    let hasmorepages = true;

    while(hasmorepages){
        const rows = await page.locator('#example tbody tr').all();

        for(let row of rows){ //1st, 2nd
            console.log(await row.allInnerTexts());
            const name = await row.locator('td').nth(0).innerText();
            if(name === "Vishnu"){
                const position = await row.locator('td').nth(1).innerText();
                const office = await row.locator('td').nth(2).innerText();
                console.log(position);
                expect(position).toBe('Developer');
                hasmorepages = false; // while loop exit criteria, Most IMP
            }
        }
        const next:Locator = page.locator('button[aria-label="Next"]');
        const isDisabled:boolean = await next.isDisabled();

        if(isDisabled){
            hasmorepages = false;
            console.log('we have searched all the pages in the webtable')
        }
        else{
            await next.click();
        }

    }


 });