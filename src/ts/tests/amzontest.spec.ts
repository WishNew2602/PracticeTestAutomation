import {test, expect} from '@playwright/test';

test.skip('Search a product', async({page}) => {

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