import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'https://automationexercise.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000
  },

  projects: [
    {
      name: 'chromium',
      testMatch: '**/*.ui.spec.ts',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      testMatch: '**/*.ui.spec.ts',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'api',
      testMatch: '**/*.api.spec.ts'
    }
  ]
});
