import { Page, test, expect } from '@playwright/test';
import { BasePage } from '../basePage';

export class ProductPage extends BasePage {
    protected readonly productPageLocators = {
        productName: this.page.locator('div[itemprop="name"] h1'),
        productPriceValue: this.page.locator('div.price-information div[itemprop="price"] span.value'),
        productPriceCurrency: this.page.locator('div.price-information div[itemprop="price"] span.ukr'),
        availabilityStatus: this.page.locator('div.in-stock span.text')
    };

    constructor(page: Page) {
        super(page);
    }

    async verifyProductName(expectedName: string) {
        await test.step(`Verify product name: ${expectedName}`, async () => {
            await expect(this.productPageLocators.productName).toHaveText(expectedName, { timeout: 10000 });
        });
    }

    async verifyProductPrice(): Promise<void> {
        await test.step(`Verify product price format`, async () => {
            const priceValue = await this.productPageLocators.productPriceValue.textContent();
            const priceCurrency = await this.productPageLocators.productPriceCurrency.textContent();
            const priceText = `${priceValue} ${priceCurrency}`;
            await expect(priceText).toMatch(/^\d+\s\d+\sгрн\.$/);
        });
    }

    async verifyAvailabilityStatus(): Promise<void> {
        await test.step(`Verify availability status`, async () => {
            await expect(this.productPageLocators.availabilityStatus).toHaveText('В наявності', { timeout: 10000 });
        });
    }
}
