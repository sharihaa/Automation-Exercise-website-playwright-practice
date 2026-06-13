import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/products');
    await this.expectProductsPageLoaded();
  }

  async expectProductsPageLoaded(): Promise<void> {
    await expect(this.page.locator('.title').filter({ hasText: 'All Products' })).toBeVisible();
    await expect(this.page.locator('.features_items')).toBeVisible();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.page.locator('#search_product').fill(productName);
    await this.page.locator('#submit_search').click();
    await expect(this.page.locator('.title').filter({ hasText: 'Searched Products' })).toBeVisible();
  }

  async expectSearchResultContains(productName: string): Promise<void> {
    await expect(this.page.locator('.features_items')).toContainText(productName);
  }

  async openFirstProductDetails(): Promise<void> {
    await this.page.locator('a[href^="/product_details/"]').first().click();
    await expect(this.page.locator('.product-information')).toBeVisible();
  }

  async addProductToCart(productId: number): Promise<void> {
    await this.page.locator(`a.add-to-cart[data-product-id="${productId}"]`).first().click();
    await expect(this.page.locator('#cartModal')).toBeVisible();
    await expect(this.page.locator('#cartModal')).toContainText('Added!');
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(this.page.locator('#cartModal')).toBeHidden();
  }

  async viewCartFromModal(): Promise<void> {
    await this.page.locator('#cartModal').getByText('View Cart').click();
  }

  async filterByWomenDressCategory(): Promise<void> {
    await this.page.locator('a[href="#Women"]').click();
    await this.page.locator('a[href="/category_products/1"]').click();
    await expect(this.page.locator('.title')).toContainText('Women - Dress Products');
  }

  async filterByPoloBrand(): Promise<void> {
    await this.page.locator('a[href="/brand_products/Polo"]').click();
    await expect(this.page.locator('.title')).toContainText('Brand - Polo Products');
  }
}
