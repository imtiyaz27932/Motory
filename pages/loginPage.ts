import {Page, expect, Locator} from "@playwright/test";
import testdata from '../vechileData.json';
import * as fs from "node:fs";
require("fs")
const path = require('path');

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
    private sellmycarButton = () => this.page.locator('button.sell-car');
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
    private askingPrice = () => this.page.getByRole('textbox', { name: 'Selling Price' });
    private engineCapacityInput = () => this.page.getByRole('textbox', { name: 'Engine Capacity (L)' });
    private listingDetailsInput = () => this.page.getByRole('textbox', { name: 'Listing Details' });
    private nextbutton = () => this.page.getByRole('button', { name: 'Next' });
    private saveandContinueBtn = () => this.page.locator('button.sell-submit');

    // Helpers
    private async waitAndClick(locator: () => Locator, timeout = 30000) {
        const element = locator();

        // Wait for element to be attached to DOM
        await element.waitFor({ state: 'attached', timeout });

        // Wait for element to be visible
        // await element.waitFor({ state: 'visible', timeout });

        // Scroll into view if needed
        await element.scrollIntoViewIfNeeded();

        // Wait for element to be enabled
        await expect(element).toBeEnabled({ timeout });

        // Click the element
        await element.click({ timeout, force: true });

        // Wait a moment for any transitions/animations
        await this.page.waitForTimeout(500);
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

    async selectMakeOption(locator:Locator) {
        await this.waitAndClick(()=> locator);
    }

    async selectModelOption(locator: Locator) {
        await this.waitAndClick(()=>locator);
    }

    async selectYearOption(locator: Locator) {
        await this.waitAndClick(()=> locator);
    }

    async selectGuaranteeMonthsOption() {
        await this.waitAndClick(this.selectGuaranteeMonths);
    }

    async selectBlackColorOption(locator: Locator) {
        await this.waitAndClick(()=> locator);
    }

    async selectMilagesOption(locator: Locator) {
        await this.waitAndClick(()=> locator);
    }

    async selectFuelTypeOption(locator: Locator) {
        await this.waitAndClick(()=> locator);
    }

    async selectTransmissionOption(locator: Locator) {
        await this.waitAndClick(()=> locator);
    }

    async selectCityOption(locator: Locator) {
        await this.waitAndClick(()=> locator);
    }

    async selectPricingOption(locator: Locator) {
        await this.waitAndClick(() => locator);
    }

    async enterListingDetails(record) {
        await this.waitAndFill(this.gradeInput, testdata.grade);
        await this.waitAndFill(this.VINInput, record.Vin);
        // await this.waitAndFill(this.askingPrice,record.askingprice.toString())
        await this.waitAndFill(this.engineCapacityInput, testdata.engineCapacity);
        await this.waitAndFill(this.listingDetailsInput, testdata.listingDetails);
        await this.nextbutton().scrollIntoViewIfNeeded()
        await this.waitAndClick(this.nextbutton);

    }

    async uploadImages(record) {
        var imagesPath = `./images/${record.vehiclelistingid}`;
        const files =fs.readdirSync(imagesPath);

        console.log(files)

        for (let i = 0; i < files.length; i++) {
            const fileInput = this.page.locator('input[type="file"]').nth(i);
            await fileInput.setInputFiles(path.resolve(imagesPath,files[i]));
            await this.page.waitForTimeout(1000);
            await this.page.locator('.camera-icon').nth(i).waitFor({ state: 'visible' });
            await this.page.waitForTimeout(1000);
        }
    }

    // async clickSaveAndContinueButton() {
    //     await this.saveandContinueBtn().scrollIntoViewIfNeeded()
    //     await this.waitAndClick(this.saveandContinueBtn);
    // }
    async clickSaveAndContinueButton() {
        await this.saveandContinueBtn().scrollIntoViewIfNeeded()
        await this.waitAndClick(this.saveandContinueBtn);
    }
    async  clickButtonInGoogleAdsIframe( buttonSelector:string) {
        // Get count of iframes with same ID
        const iframeCount = await this.page.locator('iframe[id^="google_ads_iframe_"]').count();
        console.log(`Found ${iframeCount} iframes with google_ads_iframe_ ID`);

        for (let i = 0; i < iframeCount; i++) {
            try {
                console.log(`Checking iframe ${i + 1}...`);

                const iframe = this.page.frameLocator(`iframe[id^="google_ads_iframe_"] >> nth=${i}`);

                // Wait for iframe content
                await iframe.locator('body').waitFor({ state: 'visible', timeout: 3000 });

                // Check if button exists in this iframe
                const button = iframe.locator(buttonSelector);

                if (await button.count() > 0) {
                    console.log(`✅ Found button in iframe ${i + 1}`);
                    await button.click();
                    return true;
                }

            } catch (error) {
                console.log(`❌ Button not found in iframe ${i + 1}`);
                continue;
            }
        }

        throw new Error('Button not found in any iframe');
    }
    async  selectMileageWithEvaluate(page, mileageText) {
        const success = await page.evaluate((text) => {
            // Find the radio input
            const radio = document.querySelector(`input[data-name="${text}"]`);

            if (radio) {
                // Set as checked
                radio.click()
                // // Trigger events to notify the form
                radio.dispatchEvent(new Event('change', { bubbles: true }));
                radio.dispatchEvent(new Event('input', { bubbles: true }));
                radio.dispatchEvent(new Event('click', { bubbles: true }));

                return true;
            }

            return false;
        }, mileageText);

        if (success) {
            console.log(`✅ Mileage selected: ${mileageText}`);
        } else {
            throw new Error(`Failed to select mileage: ${mileageText}`);
        }
    }





}

