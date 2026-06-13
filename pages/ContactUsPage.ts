import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/contact_us');
    await this.expectContactPageLoaded();
  }

  async expectContactPageLoaded(): Promise<void> {
    await expect(this.page.getByText('Get In Touch')).toBeVisible();
  }

  async submitContactForm(name: string, email: string, subject: string, message: string): Promise<void> {
    await this.page.locator('[data-qa="name"]').fill(name);
    await this.page.locator('[data-qa="email"]').fill(email);
    await this.page.locator('[data-qa="subject"]').fill(subject);
    await this.page.locator('[data-qa="message"]').fill(message);

    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.page.locator('[data-qa="submit-button"]').click();
  }

  async expectSuccessMessage(): Promise<void> {
    await expect(this.page.locator('.status.alert-success')).toContainText('Success! Your details have been submitted successfully.');
  }
}
