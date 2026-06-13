import { test } from '@playwright/test';
import { ContactUsPage } from '../../pages/ContactUsPage';
import { generateUniqueEmail, generateUniqueSubject } from '../../utils/randomData';

test.describe('Contact Us UI tests', () => {
  test('TC-016 @regression should submit contact us form', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    await contactUsPage.open();
    await contactUsPage.submitContactForm(
      'SQA Test User',
      generateUniqueEmail(),
      generateUniqueSubject(),
      'This is an automated message from Playwright portfolio framework.'
    );
    await contactUsPage.expectSuccessMessage();
  });
});
