import { test} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { log } from 'console';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('should display the login page', async ({ page }) => {
        await loginPage.clickSignInButton();
        await loginPage.clickDealerTab()
        await loginPage.enterLoginDetails();
        await loginPage.clickSellMyCarButton();
        await loginPage.clickOnMotaryButton();
        await loginPage.selectMakeOption()
        await loginPage.selectModelOption();
        await loginPage.selectYearOption();
        await loginPage.selectGuaranteeMonthsOption();
        await loginPage.selectBlackColorOption();
        await loginPage.selectMilagesOption();
        await loginPage.selectFuelTypeOption();
        await loginPage.selectTransmissionOption();
        await loginPage.selectCityOption();
        await loginPage.selectPricingOption();
        await loginPage.enterListingDetails()
        await loginPage.uploadImages()
        await loginPage.clickSaveAndContinueButton();

       
    });

    
});