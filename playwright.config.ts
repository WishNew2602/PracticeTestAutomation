import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/ts/tests',
  timeout : 30*1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  use: {
    headless: true,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    
    ['html',{open:'always', outputFolder: './reports/my-report'}],
    // ['list'],
    // ['json', { outputFile: 'test-results.json' }],
    // ['junit', { outputFile: 'test-results.xml' }],
    // ['line'],
    // ['dot'],
    ['allure-playwright', { resultsDir: './reports/allure-results' }],
    
    // ['blob', { outputFile: './reports/blobreportcustom/test-results.blob' }],
    // ['./customReporter.ts']
],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'on',
    video: 'off',
    viewport: { width: 1280, height: 720 }  ,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] ,
            headless: true,
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'],
    //         headless: false,
    //    },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'],
    //        headless: false,
    //    },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
