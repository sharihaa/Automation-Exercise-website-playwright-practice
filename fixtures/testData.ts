import { generateUniqueEmail } from '../utils/randomData';

export type TestUser = {
  name: string;
  email: string;
  password: string;
  title: 'Mr' | 'Mrs';
  birthDate: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export function createTestUser(): TestUser {
  return {
    name: 'SQA Test User',
    email: generateUniqueEmail(),
    password: 'Password123!',
    title: 'Mr',
    birthDate: '10',
    birthMonth: 'May',
    birthYear: '1998',
    firstName: 'SQA',
    lastName: 'Tester',
    company: 'Portfolio QA Ltd',
    address1: '123 Automation Road',
    address2: 'Suite 45',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    zipcode: '10001',
    mobileNumber: '1234567890'
  };
}

export const existingInvalidUser = {
  email: 'invalid-user@example.com',
  password: 'wrongPassword123'
};

export const products = {
  blueTop: 'Blue Top',
  menTshirt: 'Men Tshirt',
  dress: 'Dress'
};
