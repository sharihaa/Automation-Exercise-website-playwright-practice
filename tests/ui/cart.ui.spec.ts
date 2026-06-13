import { test } from '@playwright/test';
import { products } from '../../fixtures/testData';
import { CartPage } from '../../pages/CartPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart UI tests', () => {
  test('TC-011 @smoke should add single product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.addProductToCart(1);
    await productsPage.viewCartFromModal();

    await cartPage.expectCartPageLoaded();
    await cartPage.expectProductInCart(products.blueTop);
    await cartPage.expectProductCount(1);
  });

  test('TC-012 @regression should add multiple products to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.addProductToCart(1);
    await productsPage.continueShopping();
    await productsPage.addProductToCart(2);
    await productsPage.viewCartFromModal();

    await cartPage.expectCartPageLoaded();
    await cartPage.expectProductCount(2);
  });

  test('TC-013 @regression should remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.addProductToCart(1);
    await productsPage.viewCartFromModal();
    await cartPage.removeFirstProduct();
  });
});
