import{test,expect, Locator} from '@playwright/test';

test('static table test', async ({ page }) => {

    //create test script to navigate to URL and click on the table link and 
    // capture the screenshot of the table and attach in the report and also 
    // capture the text of the table and print in console.
    // use the locator chaining to locate the table and rows separately and use all method to get all the rows in the table 
    // And count method to get the count number of row located in the table and toHaveCount method to assert the count of rows in the table 
    // And allInnerTexts method to get the text of all the cells in the row and also get the due amount of Frank based on his first name.
    await page.goto('https://the-internet.herokuapp.com/');
    await page.locator('//a[text()="Sortable Data Tables"]').click();
    await page.waitForLoadState('domcontentloaded');

    //Locator chaining to locate the table and rows separately
    const table:Locator = page.locator('//table[@id="table1"]');
    const tableRows:Locator = table.locator('//tbody/tr'); 

    //all method to get all the rows in the table
    const allRows = await tableRows.all();
    console.log(allRows.length);

    // count method to get the count number of row located in the table
    const noOfRows =  await tableRows.count();
    console.log(noOfRows);

    //toHaveCount method to assert the count of rows in the table
    await expect(tableRows).toHaveCount(4); //approch 1
    expect(noOfRows).toBe(4); //approch 2

    //allInnerTexts method to get the text of all the cells in the row
    const firstRowData = tableRows.nth(0).locator('td'); //approch 1
    console.log(await firstRowData.allInnerTexts());
    console.log(await firstRowData.allTextContents()); //approch 2
    console.log(await firstRowData.allTextContents()); //approch 2
    await expect(firstRowData).toHaveText(['Smith', 'John', 'jsmith@gmail.com', '$50.00', 'http://www.jsmith.com', 'edit delete']);

    //Due/AnyOther Table Data based on First name/AnyOther column

    for(let row of allRows){

        const firstName = await row.locator('td').nth(1).innerText();
        console.log(firstName);

        if(firstName === 'Frank') {
            const due = await row.locator('td').nth(3).innerText(); //"";
            const edit:string|null = await row.locator('td').nth(5).textContent();
            console.log(due);
            console.log(edit);
            if(edit !== null) {
                console.log(edit.trim());
            }
        }

    }


});