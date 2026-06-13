import { test } from '@playwright/test';
import { products } from '../../fixtures/testData';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products UI tests', () => {
  test('TC-006 @smoke should view all products page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.expectProductsPageLoaded();
  });

  test('TC-007 @smoke should search for a product', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.searchProduct(products.blueTop);
    await productsPage.expectSearchResultContains(products.blueTop);
  });

  test('TC-008 @regression should open product details page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.openFirstProductDetails();
  });

  test('TC-009 @regression should filter products by category', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.filterByWomenDressCategory();
  });

  test('TC-010 @regression should filter products by brand', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await productsPage.filterByPoloBrand();
  });
});
