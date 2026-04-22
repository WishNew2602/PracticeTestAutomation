import {test, expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import { TestDataUtil } from '../utilities/FakeDataGen';

// const csvpath = './src/resources/testdata/csvdata.csv';
// const readFile = fs.readFileSync(csvpath, 'utf-8');

// const records:any= parse(readFile, {columns:true, skip_empty_lines:true});

const records:any = TestDataUtil.getCSVData('./src/resources/testdata/csvdata.csv');

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