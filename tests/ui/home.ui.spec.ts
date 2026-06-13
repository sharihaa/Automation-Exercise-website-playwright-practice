import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home UI tests', () => {
  test('TC-001 @smoke should load Automation Exercise home page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.expectHomePageLoaded();
  });
});
