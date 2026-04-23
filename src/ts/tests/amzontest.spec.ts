import {test, expect} from '@playwright/test';

test.skip('Search a product', async({page}) => {

    test.beforeEach('before each', async({page}) =>{
    console.log('before each');
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        console.log(dialog.type());
        if(dialog.type() === 'prompt'){
            await dialog.accept('Vishnu');
        }
        if(dialog.type() === 'alert'){
            await dialog.accept();
        }
        if(dialog.type() === 'confirm'){
            await dialog.dismiss();
        }
    }); //event defination for dialog   
});
    const searchTerm = 'Iphone';
    console.log(searchTerm);
    await page.goto('https://amazon.com/');
    await page.getByLabel('Select the department you want to search in').click();
    await page.getByLabel('Select the department you want to search in').selectOption('Electronics');
    await page.getByRole('searchbox', {name:'Search Amazon'}).click();
    await page.getByPlaceholder('Search Amazon').fill('Iphone');
    // await page.locator('.nav-search-field > input[id="twotabsearchtextbox"]').click();
    // await page.locator('.nav-search-field > input[id="twotabsearchtextbox"]').clear()
    // await page.locator('.nav-search-field > input[id="twotabsearchtextbox"]').press('Enter');
    // await page.getByText('Sell').click();
    test('different util methods', async({page}) => {
        await page.goto('https://www.tutorialspoint.com/selenium/practice/register.php');
        // await page.getByPlaceholder('First Name').fill(TestDataUtil.getFirstName());
        // await page.getByPlaceholder('lastname').fill(TestDataUtil.getLastName());
        // await page.getByPlaceholder('UserName').fill(TestDataUtil.getUsername());
        // await page.getByPlaceholder('Password').fill('Password123');
    });


})