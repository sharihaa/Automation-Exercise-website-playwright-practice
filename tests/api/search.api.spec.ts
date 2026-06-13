import { expect, test } from '@playwright/test';
import { parseAutomationApiResponse } from '../../utils/apiHelpers';

test.describe('Search Product API tests', () => {
  test('API-007 @smoke should search product by valid keyword', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: { search_product: 'top' }
    });
    const body = await parseAutomationApiResponse(response);

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API-008 @regression should return bad request when search parameter is missing', async ({ request }) => {
    const response = await request.post('/api/searchProduct');
    const body = await parseAutomationApiResponse(response);

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });
});
