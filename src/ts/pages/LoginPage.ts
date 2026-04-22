import{Page, Locator, expect} from '@playwright/test';

export class LoginPage{

    private page:Page;
    private usernameInput:Locator;
    private passwordInput:Locator;
    private submitButton:Locator;
    private errorLoc:Locator;

    constructor(page:Page){
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#submit');
        this.errorLoc = page.locator('#error');
    }

// Different Web Actions we do in this login

async navigatetoURL():Promise<void>{
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
}

async login(username:string, password:string):Promise<void>{
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password);
    await this.submitButton.click();
}

async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
}

async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
}

async clickLoginButton(): Promise<void> {
    await this.submitButton.click();
}

async isLoggedIn(): Promise<boolean> {
    return await this.page.url().includes('logged-in-successfully');
}

async isLoginError(): Promise<void>{
    await expect(this.errorLoc).toBeVisible();
}

}