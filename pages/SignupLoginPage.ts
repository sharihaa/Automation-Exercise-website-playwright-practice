import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import type { TestUser } from '../fixtures/testData';

export class SignupLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/login');
    await this.expectSignupLoginPageLoaded();
  }

  async expectSignupLoginPageLoaded(): Promise<void> {
    await expect(this.page.getByText('New User Signup!')).toBeVisible();
    await expect(this.page.getByText('Login to your account')).toBeVisible();
  }

  async signupWithNameAndEmail(user: TestUser): Promise<void> {
    await this.page.locator('[data-qa="signup-name"]').fill(user.name);
    await this.page.locator('[data-qa="signup-email"]').fill(user.email);
    await this.page.locator('[data-qa="signup-button"]').click();
  }

  async fillAccountInformation(user: TestUser): Promise<void> {
    await expect(this.page.getByText('Enter Account Information')).toBeVisible();
    await this.page.locator(`#id_gender${user.title === 'Mr' ? '1' : '2'}`).check();
    await this.page.locator('[data-qa="password"]').fill(user.password);
    await this.page.locator('[data-qa="days"]').selectOption(user.birthDate);
    await this.page.locator('[data-qa="months"]').selectOption({ label: user.birthMonth });
    await this.page.locator('[data-qa="years"]').selectOption(user.birthYear);
    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();
  }

  async fillAddressInformation(user: TestUser): Promise<void> {
    await this.page.locator('[data-qa="first_name"]').fill(user.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(user.lastName);
    await this.page.locator('[data-qa="company"]').fill(user.company);
    await this.page.locator('[data-qa="address"]').fill(user.address1);
    await this.page.locator('[data-qa="address2"]').fill(user.address2);
    await this.page.locator('[data-qa="country"]').selectOption(user.country);
    await this.page.locator('[data-qa="state"]').fill(user.state);
    await this.page.locator('[data-qa="city"]').fill(user.city);
    await this.page.locator('[data-qa="zipcode"]').fill(user.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(user.mobileNumber);
  }

  async submitCreateAccount(): Promise<void> {
    await this.page.locator('[data-qa="create-account"]').click();
  }

  async createNewAccount(user: TestUser): Promise<void> {
    await this.open();
    await this.signupWithNameAndEmail(user);
    await this.fillAccountInformation(user);
    await this.fillAddressInformation(user);
    await this.submitCreateAccount();
    await this.expectAccountCreated();
    await this.continueAfterAccountCreated();
  }

  async expectAccountCreated(): Promise<void> {
    await expect(this.page.locator('[data-qa="account-created"]')).toContainText('Account Created!');
  }

  async continueAfterAccountCreated(): Promise<void> {
    await this.page.locator('[data-qa="continue-button"]').click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
  }

  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.page.locator('body')).toContainText(`Logged in as ${name}`);
  }

  async expectInvalidLoginError(): Promise<void> {
    await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.page.locator('a[href="/logout"]').click();
    await this.expectSignupLoginPageLoaded();
  }
}
