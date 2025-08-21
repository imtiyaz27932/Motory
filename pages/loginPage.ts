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
        await this.page.goto('/en', { waitUntil: 'load' });
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
      //  await this.waitAndFill(this.askingPrice,record.askingprice.toString())
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
        const button = this.page.locator("button.sell-submit");

        // ✅ Step 0 – Wait for jQuery (if present) to finish AJAX calls
        await this.page.waitForFunction(
            () => (window as any).jQuery ? (window as any).jQuery.active === 0 : true,
            { timeout: 10000 }
        );

        // Step 1 – Debug info
        console.log("------ DEBUG START ------");
        console.log("Button count:", await button.count());
        if (await button.count() > 0) {
            console.log("Button text:", await button.first().textContent());
            console.log("Is visible:", await button.first().isVisible());
            console.log("Is enabled:", await button.first().isEnabled());
        }
        console.log("------ DEBUG END ------");

        // Step 2 – Wait until it's attached, visible, and enabled
        await button.first().waitFor({ state: "attached", timeout: 10000 });
        await button.first().waitFor({ state: "visible", timeout: 10000 });
        await this.page.waitForSelector("button.sell-submit:not([disabled])", { timeout: 10000 });

        // Step 3 – Scroll into view
        await button.first().scrollIntoViewIfNeeded();

        // Step 4 – Try normal click
        try {
            await button.first().click({ timeout: 5000 });
            console.log("✅ Normal click worked");
            return;
        } catch (err) {
            console.log("⚠️ Normal click failed, trying fallback...", err);
        }

        // Step 5 – Try mouse click
        const box = await button.first().boundingBox();
        if (box) {
            await this.page.mouse.move(box.x + 5, box.y + 5);
            await this.page.mouse.click(box.x + 5, box.y + 5);
            console.log("✅ Mouse click worked");
            return;
        }

        // Step 6 – Force click via JS (last resort)
        await this.page.evaluate(() => {
            const btn = document.querySelector("button.sell-submit") as HTMLElement;
            if (btn) btn.click();
        });
        console.log("✅ JS click triggered");
    }




    async  selectMileageWithEvaluate(page, mileageText) {
        const success = await page.evaluate((text) => {
            // Find the radio input
            const radio = document.querySelector(`input[data-name="${text}"]`);

            if (radio) {
                // Set as checked
                radio.click()
                // // Trigger events to notify the form
                // radio.dispatchEvent(new Event('change', { bubbles: true }));
                // radio.dispatchEvent(new Event('input', { bubbles: true }));
                // radio.dispatchEvent(new Event('click', { bubbles: true }));

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

