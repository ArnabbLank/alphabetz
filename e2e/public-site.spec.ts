import { test, expect } from '@playwright/test';

/**
 * Smoke coverage for the public marketing site. Deliberately shallow: it proves
 * the routes build and render, so a broken page fails CI rather than being found
 * by a parent. Journey-level coverage is ALZ-156.
 */

const publicRoutes = ['/', '/courses', '/about', '/results', '/blog', '/contact'];

for (const path of publicRoutes) {
  test(`public route ${path} renders without a client error`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    const res = await page.goto(path);
    expect(res?.status(), `${path} should return 2xx`).toBeLessThan(400);

    // Something meaningful must be on the page, not just a shell.
    await expect(page.locator('body')).not.toBeEmpty();
    expect(errors, `${path} threw: ${errors.join('; ')}`).toHaveLength(0);
  });
}

test('the admin portal is not reachable without a session', async ({ page }) => {
  // Guards the current middleware behaviour. When ALZ-27 replaces the cookie
  // check with real Supabase session verification, this test must still pass.
  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL(/\/admin\/login/);
});

test('the student portal is not reachable without a session', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/student\/login/);
});
