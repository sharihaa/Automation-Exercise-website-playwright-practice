import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectCheckoutPageLoaded(): Promise<void> {
    await expect(this.page.locator('.breadcrumb')).toContainText('Checkout');
    await expect(this.page.locator('#address_delivery')).toBeVisible();
    await expect(this.page.locator('#cart_info')).toBeVisible();
  }

  async expectProductVisibleInOrderReview(productName: string): Promise<void> {
    await expect(this.page.locator('#cart_info')).toContainText(productName);
  }

  async addComment(comment: string): Promise<void> {
    await this.page.locator('textarea[name="message"]').fill(comment);
  }
}
