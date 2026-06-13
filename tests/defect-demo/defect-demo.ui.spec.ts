import { expect, test } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Intentional defect evidence tests', () => {
  test.skip(!process.env.DEFECT_DEMO, 'Run with npm run test:defects only.');

  test('DEF-001 should fail with wrong product search validation', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.searchProduct('Blue Top');

    await expect(page.locator('.features_items')).toContainText('This Product Name Does Not Exist');
  });

  test('DEF-002 should fail with wrong cart item count validation', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.addProductToCart(1);
    await productsPage.viewCartFromModal();

    await expect(page.locator('tbody tr')).toHaveCount(5);
  });

  test('DEF-003 should fail with wrong heading validation', async ({ page }) => {
    await page.goto('/products');

    await expect(page.locator('.title').first()).toContainText('Wrong Heading Text');
  });

  test('DEF-004 should fail with wrong API status validation', async ({ request }) => {
    const response = await request.get('/api/productsList');

    expect(response.status()).toBe(404);
  });
});
