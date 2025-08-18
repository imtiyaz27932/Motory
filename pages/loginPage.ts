import { Page, expect } from "@playwright/test";
import testdata from '../vechileData.json';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private signinButton = () => this.page.getByText('Sign in');
    private dealerTab = () => this.page.getByText('Dealer', { exact: true });
    private mobileNumber = () => this.page.getByRole('textbox', { name: 'Example:' });
    private password = () => this.page.getByRole('textbox', { name: 'Password' });
    private loginButton = () => this.page.locator('app-log-in div').filter({ hasText: 'Login' }).nth(3);
    private sellmycarButton = () => this.page.getByText('Sell your CarSell');
    private clickonMotarybutton = () => this.page.getByRole('button', { name: 'Sell it on Motory.com' });

    private selectMake = () => this.page.locator('label').first();
    private selectModel = () => this.page.locator('label[for="label-Fortuner-406"]');
    private selectYear = () => this.page.locator('label[for="label-2026-2026"]');
    private selectGuaranteeMonths = () => this.page.locator('label[for="label-6 months-6"]');
    private selectBlackColor = () => this.page.locator('label[for="label-Black-737"]');
    private selectMilages = () => this.page.locator('label[for="label-20,000-29,999-711"]');
    private selectFuelType = () => this.page.locator('label[for="label-Diesel-576"]');
    private selectTransmission = () => this.page.locator('label[for="label-Automatic-1"]');
    private selectCity = () => this.page.locator('label[for="label-Riyadh-810"]');
    private selectPricing = () => this.page.locator('label[for="label-Contact Seller-contact"]');

    private gradeInput = () => this.page.getByRole('textbox', { name: 'Grade' });
    private VINInput = () => this.page.getByRole('textbox', { name: 'VIN Number' });
    private engineCapacityInput = () => this.page.getByRole('textbox', { name: 'Engine Capacity (L)' });
    private listingDetailsInput = () => this.page.getByRole('textbox', { name: 'Listing Details' });
    private nextbutton = () => this.page.getByRole('button', { name: 'Next' });
    private saveandContinueBtn = () => this.page.getByRole('button', { name: 'Save and Continue' })

    // Helpers
    private async waitAndClick(locator: () => any, timeout = 15000) {
        // await locator().scrollIntoViewIfNeeded();
        //await locator().waitFor({ state: 'visible', timeout });
        await expect(locator()).toBeEnabled();
        await locator().click();
    }

    private async waitAndFill(locator: () => any, value: string, timeout = 15000) {
       // await locator().scrollIntoViewIfNeeded();
        await locator().waitFor({ state: 'visible', timeout:10000 });
        await locator().fill(value);
    }

    // Actions
    async goto() {
        await this.page.goto('/en', { waitUntil: 'domcontentloaded' });
        await this.signinButton().waitFor({ state: 'visible', timeout: 15000 });
    }

    async clickSignInButton() {
        await this.waitAndClick(this.signinButton);
    }

    async clickDealerTab() {
        await this.waitAndClick(this.dealerTab);
    }

    async enterLoginDetails() {
        await this.waitAndFill(this.mobileNumber, process.env.MOBILENUMBER || '');
        await this.waitAndFill(this.password, process.env.PASSWORD || '');
        await this.waitAndClick(this.loginButton);
    }

    async clickSellMyCarButton() {
        await this.waitAndClick(this.sellmycarButton);
    }

    async clickOnMotaryButton() {
        await this.waitAndClick(this.clickonMotarybutton);
    }

    async selectMakeOption() {
        await this.waitAndClick(this.selectMake);
    }

    async selectModelOption() {
        await this.waitAndClick(this.selectModel);
    }

    async selectYearOption() {
        await this.waitAndClick(this.selectYear);
    }

    async selectGuaranteeMonthsOption() {
        await this.waitAndClick(this.selectGuaranteeMonths);
    }

    async selectBlackColorOption() {
        await this.waitAndClick(this.selectBlackColor);
    }

    async selectMilagesOption() {
        await this.waitAndClick(this.selectMilages);
    }

    async selectFuelTypeOption() {
        await this.waitAndClick(this.selectFuelType);
    }

    async selectTransmissionOption() {
        await this.waitAndClick(this.selectTransmission);
    }

    async selectCityOption() {
        await this.waitAndClick(this.selectCity);
    }

    async selectPricingOption() {
        await this.waitAndClick(this.selectPricing);
    }

    async enterListingDetails() {
        await this.waitAndFill(this.gradeInput, testdata.grade);
        await this.waitAndFill(this.VINInput, testdata.VIN);
        await this.waitAndFill(this.engineCapacityInput, testdata.engineCapacity);
        await this.waitAndFill(this.listingDetailsInput, testdata.listingDetails);
        await this.nextbutton().scrollIntoViewIfNeeded()
        await this.waitAndClick(this.nextbutton);
    }

    async uploadImages() {
        const files = [
            'D:\\Motory\\images\\FrontImage.jpg',
            'D:\\Motory\\images\\BackImage.jpg',
            'D:\\Motory\\images\\frame-1-164-1755133067257.jpg',
            'D:\\Motory\\images\\frame-7-170-1755133066878.jpg',
            'D:\\Motory\\images\\frame-9-174-1755133068017.jpg',
            'D:\\Motory\\images\\frame-11-172-1755133068164.jpg',
            'D:\\Motory\\images\\frame-15-171-1755133068395.jpg',
            'D:\\Motory\\images\\frame-17-179-1755128542356.jpg',
            'D:\\Motory\\images\\frame-19-178-1755133068018.jpg'
        ];

        for (let i = 0; i < files.length; i++) {
            const fileInput = this.page.locator('input[type="file"]').nth(i);
            await fileInput.setInputFiles(files[i]);
            await this.page.locator('.camera-icon').nth(i).waitFor({ state: 'hidden' });
        }
    }

    async clickSaveAndContinueButton() {
        await this.saveandContinueBtn().scrollIntoViewIfNeeded()
        await this.waitAndClick(this.saveandContinueBtn);
    }
}

