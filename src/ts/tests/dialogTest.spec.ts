import{test,expect} from '@playwright/test';

test.beforeAll('before all', async() =>{
    console.log('before all');
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
test('dialogs new test', async({page}) =>{

    
    await page.goto('https://www.tutorialspoint.com/selenium/practice/alerts.php');
    await page.waitForLoadState('networkidle');

    await page.locator('//button[@onclick="showAlert()"]').click();
});

test.fail('dialogs test', async({page}) =>{
    console.log('dialogs test');
});

test.afterAll('after all', async() =>{
    console.log('after all');       
});

test.afterEach('after each', async({page}) =>{  
    console.log('after each');
});
