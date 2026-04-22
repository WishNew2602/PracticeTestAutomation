import {test, expect} from '@playwright/test';
import fs from 'fs';

const jsonpath = './testdata/SampleTestData.json';
//  const readdata = ;
const testdata:any = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));

console.log(testdata[0].username);

test.describe('login test for different value', async() => {

    for(const {username, password, isValid} of testdata){
            test(`Login test for ${username} and ${password}`, async ({ page }) => {
            await page.goto('https://practicetestautomation.com/practice-test-login/');
            await page.locator('#username').fill(username);
            // const loc:Locator = page.locator('#username');
            await page.locator('#password').fill(password);
            console.log(`this login is ${isValid}`);
            await page.locator('#submit').click();

            if(isValid === 'valid'){
                await expect(page.getByText('Log out')).toBeVisible();
            }else if(isValid === 'invalid username'){
                await expect(page.locator('#error')).toBeVisible();
                await expect(page.locator('#error')).toHaveText('Your username is invalid!');
                const errorMessage = await page.locator('#error').textContent();
                console.log(`Error message for invalid username: ${errorMessage}`);
                expect(errorMessage).toBe('Your username is invalid!');

            } else if(isValid === 'invalid password'){
                await expect(page.locator('#error')).toBeVisible();
                await expect(page.locator('#error')).toHaveText('Your password is invalid!');
                const errorMessage = await page.locator('#error').textContent();
                console.log(`Error message for invalid password: ${errorMessage}`);
                expect(errorMessage).toBe('Your password is invalid!');
            }
        });
    }
});




