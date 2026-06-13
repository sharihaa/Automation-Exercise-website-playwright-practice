import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import type { TestUser } from '../fixtures/testData';

export async function parseAutomationApiResponse(response: APIResponse): Promise<any> {
  const responseText = await response.text();

  try {
    return JSON.parse(responseText);
  } catch {
    const jsonStart = responseText.search(/[\[{]/);
    if (jsonStart === -1) {
      throw new Error(`API response was not JSON: ${responseText}`);
    }
    return JSON.parse(responseText.slice(jsonStart));
  }
}

export async function createUserByApi(request: APIRequestContext, user: TestUser): Promise<void> {
  const response = await request.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDate,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber
    }
  });

  const body = await parseAutomationApiResponse(response);
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe('User created!');
}

export async function deleteUserByApi(request: APIRequestContext, user: Pick<TestUser, 'email' | 'password'>): Promise<void> {
  const response = await request.delete('/api/deleteAccount', {
    form: {
      email: user.email,
      password: user.password
    }
  });

  const body = await parseAutomationApiResponse(response);

  if (body.responseCode !== 200 && body.responseCode !== 404) {
    throw new Error(`Could not delete test user. Response: ${JSON.stringify(body)}`);
  }
}
