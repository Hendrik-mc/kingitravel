import { test, expect } from '@playwright/test';

test('search flow', async ({ page }) => {
  await page.goto('/search');
  await expect(page.getByText('Sticky search bar')).toBeVisible();
});

test('compare flow', async ({ page }) => {
  await page.goto('/compare');
  await expect(page.getByRole('heading', { name: /Compare resorts/i })).toBeVisible();
});

test('auth flow', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: /Log in/i })).toBeVisible();
});

test('membership purchase flow page', async ({ page }) => {
  await page.goto('/membership');
  await expect(page.getByRole('heading', { name: /Membership/i })).toBeVisible();
});
