import{test,expect} from '@playwright/test';
import { TestDataUtil } from '../utilities/FakeDataGen';

test('different util methods', async({page}) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/register.php');
    await page.getByPlaceholder('First Name').fill(TestDataUtil.getFirstName());
    await page.getByPlaceholder('lastname').fill(TestDataUtil.getLastName());
    await page.getByPlaceholder('UserName').fill(TestDataUtil.getUsername());
    await page.getByPlaceholder('Password').fill('Password123');
});