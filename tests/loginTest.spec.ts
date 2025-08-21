import { test} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { log } from 'console';
const fs = require('fs');

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.goto();
        await page.waitForTimeout(10000);
        await loginPage.clickButtonInGoogleAdsIframe('#close-ad');
    });

    test('should display the login page', async ({ page }) => {
        // const iframe =  page.frameLocator('iframe');
        // await iframe.locator('body').waitFor({ state: 'visible' });
        // await iframe.locator('#close-ad').waitFor({ state: 'visible' });
        const mileageRanges = [
            { min: 0, max: 0, text: "0" },
            { min: 1, max: 500, text: "1-500" },
            { min: 501, max: 9999, text: "501-9,999" },
            { min: 10000, max: 19999, text: "10,000-19,999" },
            { min: 20000, max: 29999, text: "20,000-29,999" },
            { min: 30000, max: 39999, text: "30,000-39,999" },
            { min: 40000, max: 49999, text: "40,000-49,999" },
            { min: 50000, max: 59999, text: "50,000-59,999" },
            { min: 60000, max: 69999, text: "60,000-69,999" },
            { min: 70000, max: 79999, text: "70,000-79,999" },
            { min: 80000, max: 89999, text: "80,000-89,999" },
            { min: 90000, max: 99999, text: "90,000-99,999" },
            { min: 100000, max: 119999, text: "100,000-119,999" },
            { min: 120000, max: 129999, text: "120,000-129,999" },
            { min: 130000, max: 139999, text: "130,000-139,999" },
            { min: 140000, max: 149999, text: "140,000-149,999" },
            { min: 150000, max: 159999, text: "150,000-159,999" },
            { min: 160000, max: 169999, text: "160,000-169,999" },
            { min: 170000, max: 179999, text: "170,000-179,999" },
            { min: 180000, max: 189999, text: "180,000-189,999" },
            { min: 190000, max: 199999, text: "190,000-199,999" },
            { min: 200000, max: Infinity, text: "200,000+" }
        ];

        function findMileageRange(mileageValue) {
            return mileageRanges.find(range => {
                if (range.max === Infinity) {
                    return mileageValue >= range.min;
                }
                return mileageValue >= range.min && mileageValue <= range.max;
            });
        }
        await loginPage.clickSignInButton();
        await loginPage.clickDealerTab()
        await loginPage.enterLoginDetails();
        await page.waitForTimeout(4000)
        await loginPage.clickSellMyCarButton();
        await loginPage.clickOnMotaryButton();
        await page.waitForLoadState('load');
        await page.waitForTimeout(20000)
        await loginPage.clickButtonInGoogleAdsIframe('#close-ad');

        const allData = JSON.parse(fs.readFileSync('data.json', 'utf-8'))  ;

        const vehicleMakeContainer =  page.locator('#vehicle-make_id')
        const vehicleModelContainer =  page.locator('#vehicle-model_id')
        const yearContainer =  page.locator('#vehicle-year')
        const colorContainer =  page.locator('#vehicleuseddetail-color_id')
        await page.waitForTimeout(1000)
        const mileageContainer =  page.locator('#vehicle-mileage_id')
        const fuelTypeContainer =  page.locator('#vehicleuseddetail-fuel_type_id')
        const transmissionContainer =  page.locator('#vehicle-transmission_id')
        const cityContainer =  page.locator('#vehicleuseddetail-city_id')
        const determinePriceContainer =  page.locator('#vehicleuseddetail-pricing_type')

        for(const make of allData) {
            console.log(JSON.stringify(make))


            const vehicleMakeRegex = new RegExp(make.vehiclemakekey, 'i');
            const vehicleModelRegex = new RegExp(make.vehiclemodel, 'i');
            const makeLocator= vehicleMakeContainer.getByText(vehicleMakeRegex).locator('xpath=preceding-sibling::img[1]');

            await page.fill( '#vehicle-search_field',make.vehiclemakekey)


            await loginPage.selectMakeOption(makeLocator)

            await page.waitForTimeout(1000)

            await page.fill( '#step-2  #vehicle-search_field',make.vehiclemodel)

            await loginPage.selectModelOption(vehicleModelContainer.getByText(vehicleModelRegex));


            await page.fill( '#step-3  #vehicle-search_field',make.manufactureyear)

            await loginPage.selectYearOption(yearContainer.getByText(make.manufactureyear));
            await page.waitForTimeout(2000)

            await loginPage.selectGuaranteeMonthsOption();
            await page.waitForTimeout(2000)

            await page.fill( '#step-5  #vehicle-search_field',make.Color || 'White')

            var color = make.Color || 'White';
            await loginPage.selectBlackColorOption(colorContainer.getByText(new RegExp('^'+color+'$','i')));


            const mileageRange = findMileageRange(make.mileage);

            console.log("mileage range",mileageRange)

            await page.waitForTimeout(5000)


            await loginPage.selectMileageWithEvaluate(page,mileageRange.text);

            await page.waitForTimeout(5000)

            await loginPage.selectFuelTypeOption(fuelTypeContainer.getByText(make.fuelType|| /^Gasoline$/));
            await page.waitForTimeout(1000)

            await loginPage.selectTransmissionOption(transmissionContainer.getByText(make.transmission || 'CVT'));

            await page.waitForTimeout(1000)

            await page.fill( '#step-9 #vehicle-search_field',make.City || 'Riyadh')


            await loginPage.selectCityOption(cityContainer.getByText(make.City || 'Riyadh'));

            await loginPage.selectPricingOption(determinePriceContainer.getByText('Contact Seller'));
            await page.waitForTimeout(1000)

            await loginPage.enterListingDetails(make)
            await page.waitForTimeout(5000)
            await loginPage.uploadImages(make)
            await loginPage.clickSaveAndContinueButton();
            }




       
    });

    
});