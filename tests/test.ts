import { expect, test } from '@playwright/test';

test('Home page has theme switcher visible', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
});
