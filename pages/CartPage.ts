import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/view_cart');
    await this.expectCartPageLoaded();
  }

  async expectCartPageLoaded(): Promise<void> {
    await expect(this.page.locator('.breadcrumb')).toContainText('Shopping Cart');
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.page.locator('#cart_info')).toContainText(productName);
  }

  async expectProductCount(count: number): Promise<void> {
    await expect(this.page.locator('tbody tr')).toHaveCount(count);
  }

  async removeFirstProduct(): Promise<void> {
    await this.page.locator('.cart_quantity_delete').first().click();
    await expect(this.page.locator('#empty_cart')).toBeVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.locator('.check_out').click();
  }
}
