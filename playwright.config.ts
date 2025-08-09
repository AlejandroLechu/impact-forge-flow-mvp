import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // Start backend then preview the built frontend
    command: "bash -lc 'cd backend && if [ -x .venv/bin/python ]; then .venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 >/dev/null 2>&1 & fi; cd .. && npm run build && VITE_API_BASE_URL=http://127.0.0.1:8000/api npm run preview -- --host 127.0.0.1 --port 5173'",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});


