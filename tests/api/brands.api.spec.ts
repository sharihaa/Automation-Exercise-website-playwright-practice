import { expect, test } from '@playwright/test';
import { parseAutomationApiResponse } from '../../utils/apiHelpers';

test.describe('Brands API tests', () => {
  test('API-004 @smoke should get all brands list', async ({ request }) => {
    const response = await request.get('/api/brandsList');
    const body = await parseAutomationApiResponse(response);

    expect(response.ok()).toBeTruthy();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0);
  });

  test('API-005 @regression should verify brand response structure', async ({ request }) => {
    const response = await request.get('/api/brandsList');
    const body = await parseAutomationApiResponse(response);
    const firstBrand = body.brands[0];

    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
  });

  test('API-006 @regression should return method not supported for PUT brands list', async ({ request }) => {
    const response = await request.put('/api/brandsList');
    const body = await parseAutomationApiResponse(response);

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });
});
