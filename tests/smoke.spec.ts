import { test, expect } from '@playwright/test';

test('landing loads and navigates', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Build Your Impact Ecosystem')).toBeVisible();
  await page.getByRole('button', { name: 'Discover Causes' }).click();
  // landing page scrolls to causes section; assert the section is visible
  await expect(page.getByText('Support Meaningful Causes')).toBeVisible();
});

test('lists tribes and causes', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Discover Active Tribes').waitFor();
  await expect(page.getByText('Discover Active Tribes')).toBeVisible();
  await expect(page.getByText('Support Meaningful Causes')).toBeVisible();
});

test('cause detail opens and donate button present', async ({ page }) => {
  await page.goto('/');
  // open first cause detail via Follow on landing
  await page.getByRole('button', { name: 'Discover Causes' }).click();
  const firstFollow = page.getByRole('button', { name: 'Follow' }).first();
  await firstFollow.waitFor({ state: 'visible' });
  await firstFollow.click();
  await expect(page).toHaveURL(/causes\//);
  await expect(page.getByRole('button', { name: /Donate/ })).toBeVisible();
});


