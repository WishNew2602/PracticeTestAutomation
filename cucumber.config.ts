import type { Configuration } from '@cucumber/cucumber';

const config: Configuration = {
  import: ['src/ts/stepdefs/*.steps.ts'],
  format: ['progress', 'json:./reports/cucumber_report.json'],
  paths: ['src/resources/features/**/*.feature'],
  timeout: 60000,
};

export default config;
