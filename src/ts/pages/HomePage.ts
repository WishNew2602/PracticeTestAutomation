import{Page, Locator, expect} from '@playwright/test';

export class HomePage{

    private page:Page;
    private logoutButton:Locator

    constructor(page:Page){
        this.page = page;
        this.logoutButton = page.getByText('Log out');
    }

    async isLogoutvisible():Promise<void>{
        expect(this.logoutButton).toBeVisible;
    }

}