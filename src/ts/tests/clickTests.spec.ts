import{test,expect} from '@playwright/test';

test('different click actions', async({page}) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/buttons.php');
    await page.locator("//button[@onclick='showDiv()']").click();
    await page.getByText('Right Click Me').click({button:'right'});
    await page.locator("//button[@ondblclick='myDoubleclick()']").dblclick();
    await expect(page.locator('//button[@onclick="showDiv()"]')).toHaveText('Click Me');
});



//prompt engineering