import{test,expect} from '@playwright/test';
import {LoginPage} from '../../../pages/LoginPage'
import { HomePage } from '../pages/HomePage';

test('new POM Tests', async({page})=>{

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigatetoURL();
    await loginPage.login('student', 'Password123');
    await homePage.isLogoutvisible();

});

// 100 more test cases