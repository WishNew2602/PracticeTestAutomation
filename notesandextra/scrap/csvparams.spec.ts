import { test, expect } from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

//Reading data from csv
const csvPath='./testdata/csvdata.csv';
const fileContent=fs.readFileSync(csvPath,'utf-8');

const records:any=parse(fileContent,{columns:true,skip_empty_lines:true})

//main test
test.describe('Login data driven test', async()=> {

    for (const data of records) {
            test(`Login test with email: "${data.username}" and password: "${data.password}"`, async ({ page }) => {
                await page.goto('https://practicetestautomation.com/practice-test-login/');
                await page.locator('#username').fill(data.username);
                await page.locator('#password').fill(data.password);
                await page.locator('#submit').click();

                if (data.validity.toLowerCase() === 'valid') {
                    const logoutLink = page.getByText('Log out');
                    await expect(logoutLink).toBeVisible({ timeout: 5000 });
                } else if (data.validity.toLowerCase() === 'invalid password') {
                    // Assert error message is visible
                    const errorMessage = page.locator('#error');
                    await expect(errorMessage).toBeVisible({ timeout: 5000 });
                    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
                } else if (data.validity.toLowerCase() === 'invalid username') {
                    const errorMessage = page.locator('#error');
                    await expect(errorMessage).toBeVisible({ timeout: 5000 });
                    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
                }
        });
        }



});

