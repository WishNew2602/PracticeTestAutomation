import {test, expect} from '@playwright/test';


test('Handle the Iframe', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/tests/htmlfiles/frames.html');

  const topSectionFrame = page
    .frameLocator('frame[name="main"]')
    .frameLocator('frame[name="topsection"]');

  await expect(topSectionFrame.locator('h3')).toHaveText('Nested Frame: Top Section');

  const headerVal = await topSectionFrame.locator('h3').textContent();
  console.log('Top section header:', headerVal);
});

    // test('Test with values', async ({ page }) => {
    //         await page.goto('https://practicetestautomation.com/practice-test-login/');
    //         await page.locator('#username').fill('student');
    //         await page.locator('#password').fill('Password123');
    //         await page.locator('#submit').click();
    // });

const values = ['student', 'vardhan', 'newguy'];
// values.forEach(value => {
//     test(`Test with value: ${value}`, async ({ page }) => {
//             await page.goto('https://practicetestautomation.com/practice-test-login/');
//             await page.locator('#username').fill(value);
//             await page.locator('#password').fill('Password123');
//             await page.locator('#submit').click();
//     });
// });

// for (const value of values) {
//     test(`Test with value using for of: ${value}`, async ({ page }) => {
//         await page.goto('https://practicetestautomation.com/practice-test-login/');
//         await page.locator('#username').fill(value);
//         console.log(`Testing with value: ${value}`);
//         await page.locator('#password').fill('Password123');
//         await page.locator('#submit').click();
//     });
// }

const twodimensionalArray: [string, string, string][] = [
    ['vishnu', 'Password123', 'isValid', ],
    ['vardhan', 'Passnew', 'isinValid'],
    ['newguy', 'Passw', 'isInvalid']
];

twodimensionalArray.forEach(([username, password, valid]) => {
    test(`Test with username: ${username} and password: ${password}`, async ({ page }) => {
            await page.goto('https://practicetestautomation.com/practice-test-login/');
            await page.locator('#username').fill(username);
            await page.locator('#password').fill(password);
            console.log(valid)
            await page.locator('#submit').click();
    });
}); 

for (const [username, password, valid] of twodimensionalArray) {
    test(`Test with username using for of: ${username} and password: ${password}`, async ({ page }) => {
            await page.goto('https://practicetestautomation.com/practice-test-login/');
            await page.locator('#username').fill(username);
            await page.locator('#password').fill(password);
            console.log(valid);
            await page.locator('#submit').click();
    });
}

test.describe('Test with group of test data', () => {
    for(const [username, password, valid] of twodimensionalArray) {
        test(`Login test for ${username} and ${password}`, async ({ page }) => {
            await page.goto('https://practicetestautomation.com/practice-test-login/');
            await page.locator('#username').fill(username);
            await page.locator('#password').fill(password);
            console.log(`this login is ${valid}`);
        });
        //`` not using ''

        test(`Logout test for ${username} and ${password}`, async ({ page }) => {
            await page.goto('https://practicetestautomation.com/practice-test-login/');
            await page.locator('#username').fill(username);
            await page.locator('#password').fill(password);
            await page.locator('#submit').click();
            await page.getByText('Log out').click();
        });
        }
});   