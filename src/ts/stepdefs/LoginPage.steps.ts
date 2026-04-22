import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage.ts";
import { chromium, Page, Browser } from "playwright";
import { expect } from "@playwright/test";

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('Navigate to Practice Test Automation website' , async() =>{
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigatetoURL();
});

When('I enter valid username and password', async () => {
    await loginPage.enterUsername('student');
    await loginPage.enterPassword('Password123');
});

When('I click the login button', async () => {
    await loginPage.clickLoginButton();
});

// Then('I should be redirected to the dashboard', async () => {
//     const isLoggedIn = await loginPage.isLoggedIn();
//     expect(isLoggedIn).toBe(true);
//     await browser.close();
// });

When('I enter valid username {string} and password {string}', function (username, password) {
    loginPage.enterUsername(username);
    console.log(username, password)
    loginPage.enterPassword(password);
});

When('I enter valid username {string} and password {float}', function (username, password) {
    loginPage.enterUsername(username);
    loginPage.enterPassword(password);
});

Then('I should see the error message Invalid username or password', function() {
    loginPage.isLoginError();
});