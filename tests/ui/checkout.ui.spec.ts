import { test } from '@playwright/test';
import { createTestUser, products } from '../../fixtures/testData';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { createUserByApi, deleteUserByApi } from '../../utils/apiHelpers';

test.describe('Checkout UI tests', () => {
  test('TC-014 @regression should proceed to checkout as logged-in user', async ({ page, request }) => {
    const user = createTestUser();
    await createUserByApi(request, user);

    const loginPage = new SignupLoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await loginPage.expectLoggedInAs(user.name);

    await productsPage.open();
    await productsPage.addProductToCart(1);
    await productsPage.viewCartFromModal();

    await cartPage.proceedToCheckout();
    await checkoutPage.expectCheckoutPageLoaded();

    await deleteUserByApi(request, user);
  });

  test('TC-015 @regression should verify order review details before placing order', async ({ page, request }) => {
    const user = createTestUser();
    await createUserByApi(request, user);

    const loginPage = new SignupLoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await loginPage.expectLoggedInAs(user.name);

    await productsPage.open();
    await productsPage.addProductToCart(1);
    await productsPage.viewCartFromModal();

    await cartPage.proceedToCheckout();
    await checkoutPage.expectCheckoutPageLoaded();
    await checkoutPage.expectProductVisibleInOrderReview(products.blueTop);
    await checkoutPage.addComment('This is an automated checkout review test. No payment is submitted.');

    await deleteUserByApi(request, user);
  });
});
