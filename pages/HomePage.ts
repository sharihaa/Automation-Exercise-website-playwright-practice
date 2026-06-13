import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async expectHomePageLoaded(): Promise<void> {
    await this.expectPageTitleContains('Automation Exercise');
    await expect(this.page.locator('body')).toContainText('AutomationExercise');
  }

  async goToSignupLogin(): Promise<void> {
    await this.page.locator('a[href="/login"]').click();
  }

  async goToProducts(): Promise<void> {
    await this.page.locator('a[href="/products"]').click();
  }

  async goToCart(): Promise<void> {
    await this.page.locator('a[href="/view_cart"]').first().click();
  }

  async goToContactUs(): Promise<void> {
    await this.page.locator('a[href="/contact_us"]').click();
  }
}
