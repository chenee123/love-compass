import { defineConfig, devices } from '@playwright/test'

/**
 * 使用系统已安装的 Chrome 运行测试，避免额外下载浏览器。
 * 若系统 Chrome 不可用，可回退到 Playwright 内置 Chromium。
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    locale: 'zh-CN',
  },
  projects: [
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 5'],
        channel: 'chrome',
      },
    },
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
