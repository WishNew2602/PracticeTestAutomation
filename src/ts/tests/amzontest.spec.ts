import {test, expect} from '@playwright/test';

test.skip('Search a product', async({page}) => {


        test('different click actions', async({page}) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/buttons.php');
    await page.locator("//button[@onclick='showDiv()']").click();
    await page.getByText('Right Click Me').click({button:'right'});
    await page.locator("//button[@ondblclick='myDoubleclick()']").dblclick();
    await expect(page.locator('//button[@onclick="showDiv()"]')).toHaveText('Click Me');
});

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


})