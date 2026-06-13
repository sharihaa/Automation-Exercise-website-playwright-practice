import { expect, test } from '@playwright/test';
import { createTestUser } from '../../fixtures/testData';
import { createUserByApi, deleteUserByApi, parseAutomationApiResponse } from '../../utils/apiHelpers';

test.describe('Authentication API tests', () => {
  test('API-009 @smoke should verify login with valid credentials', async ({ request }) => {
    const user = createTestUser();
    await createUserByApi(request, user);

    const response = await request.post('/api/verifyLogin', {
      form: {
        email: user.email,
        password: user.password
      }
    });
    const body = await parseAutomationApiResponse(response);

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');

    await deleteUserByApi(request, user);
  });

  test('API-010 @regression should return bad request for missing login parameters', async ({ request }) => {
    const response = await request.post('/api/verifyLogin');
    const body = await parseAutomationApiResponse(response);

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
  });

  test('API-011 @regression should create and delete user account', async ({ request }) => {
    const user = createTestUser();

    await createUserByApi(request, user);

    const deleteResponse = await request.delete('/api/deleteAccount', {
      form: {
        email: user.email,
        password: user.password
      }
    });
    const deleteBody = await parseAutomationApiResponse(deleteResponse);

    expect(deleteBody.responseCode).toBe(200);
    expect(deleteBody.message).toBe('Account deleted!');
  });
});
