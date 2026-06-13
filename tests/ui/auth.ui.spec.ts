import { test } from '@playwright/test';
import { createTestUser, existingInvalidUser } from '../../fixtures/testData';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { createUserByApi, deleteUserByApi } from '../../utils/apiHelpers';

test.describe('Authentication UI tests', () => {
  test('TC-002 @smoke should register a new user with valid data', async ({ page, request }) => {
    const user = createTestUser();
    const signupLoginPage = new SignupLoginPage(page);

    await signupLoginPage.createNewAccount(user);
    await signupLoginPage.expectLoggedInAs(user.name);

    await deleteUserByApi(request, user);
  });

  test('TC-003 @smoke should login with valid credentials', async ({ page, request }) => {
    const user = createTestUser();
    await createUserByApi(request, user);

    const signupLoginPage = new SignupLoginPage(page);
    await signupLoginPage.open();
    await signupLoginPage.login(user.email, user.password);
    await signupLoginPage.expectLoggedInAs(user.name);

    await deleteUserByApi(request, user);
  });

  test('TC-004 @regression should show error for invalid login', async ({ page }) => {
    const signupLoginPage = new SignupLoginPage(page);

    await signupLoginPage.open();
    await signupLoginPage.login(existingInvalidUser.email, existingInvalidUser.password);
    await signupLoginPage.expectInvalidLoginError();
  });

  test('TC-005 @regression should logout successfully', async ({ page, request }) => {
    const user = createTestUser();
    await createUserByApi(request, user);

    const signupLoginPage = new SignupLoginPage(page);
    await signupLoginPage.open();
    await signupLoginPage.login(user.email, user.password);
    await signupLoginPage.expectLoggedInAs(user.name);
    await signupLoginPage.logout();

    await deleteUserByApi(request, user);
  });
});
