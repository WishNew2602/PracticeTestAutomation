import { test, expect } from '@playwright/test';
import fs from 'fs';

//Reading data from json
const jsonPath="./testdata/SampleTestdata.json";
const readData = fs.readFileSync(jsonPath, 'utf-8');
const loginData:any=JSON.parse(readData);

//main test



    test.describe('Login data driven test', async()=> {
        for (const {username, password, validity} of loginData) {
            test(`Login test with username: "${username}" and password: "${password}"`, async ({ page }) => {
            await page.goto('https://practicetestautomation.com/practice-test-login/');
            await page.locator('#username').fill(username);
            await page.locator('#password').fill(password);
            await page.locator('#submit').click();

                if (validity.toLowerCase() === 'valid') {
                    const logoutLink = page.getByText('Log out');
                    await expect(logoutLink).toBeVisible({ timeout: 5000 });
                } else if (validity.toLowerCase() === 'invalid password') {
                    const errorMessage = page.locator('#error');
                    await expect(errorMessage).toBeVisible({ timeout: 5000 });
                    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
                } else if (validity.toLowerCase() === 'invalid username') {
                    const errorMessage = page.locator('#error');
                    await expect(errorMessage).toBeVisible({ timeout: 5000 });
                    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
                }

            });
        }

});

