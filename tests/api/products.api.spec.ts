import { expect, test } from '@playwright/test';
import { parseAutomationApiResponse } from '../../utils/apiHelpers';

test.describe('Products API tests', () => {
  test('API-001 @smoke should get all products list', async ({ request }) => {
    const response = await request.get('/api/productsList');
    const body = await parseAutomationApiResponse(response);

    expect(response.ok()).toBeTruthy();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API-002 @regression should verify first product has required fields', async ({ request }) => {
    const response = await request.get('/api/productsList');
    const body = await parseAutomationApiResponse(response);
    const firstProduct = body.products[0];

    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
  });

  test('API-003 @regression should return method not supported for POST products list', async ({ request }) => {
    const response = await request.post('/api/productsList');
    const body = await parseAutomationApiResponse(response);

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });
});
