import { test } from '@playwright/test';
import { HomePage } from '../src/eldorado/homePage';
import { ProductPage } from '../src/eldorado/productPage';

test.describe('Eldorado website testing', () => {
    let homePage: HomePage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        await homePage.load();
    });

    const productName = 'Накопичувач SSD LEXAR NM620 1TB M.2 NVMe (LNM620X001T-RNNNG)';

    test(`Step-by-step test`, async () => {
        await homePage.verifyPageURL('https://eldorado.ua/uk/');
        await homePage.searchProduct(productName);
        await homePage.verifyProductVisible(productName);
        await homePage.clickOnProduct(productName);
        await productPage.verifyProductName(productName);
        await productPage.verifyAvailabilityStatus();
        await productPage.verifyProductPrice();
    });
});
