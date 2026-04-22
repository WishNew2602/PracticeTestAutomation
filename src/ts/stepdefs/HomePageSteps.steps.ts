import { Given, When, Then } from "@cucumber/cucumber";
import { HomePage } from "../pages/HomePage.ts";
import { chromium, Page, Browser } from "playwright";
import { expect } from "@playwright/test";

let browser: Browser;
let page: Page;
let homePage: HomePage;


Then('I should be redirected to the dashboard', async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    homePage = new HomePage(page);
    await homePage.isLogoutvisible();
});