import { test, expect } from '@playwright/test';
import { NO_AUTH_STATE } from '../playwright.config';

test.describe('Profile', () => {
	test.describe('Authenticated', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/profile');
			await expect(page.getByText('Running in emulator mode. Do')).toBeVisible();
		});

		test('should see profile content', async ({ page }) => {
			await expect(page.getByRole('main')).toContainText('Protected profile area!');
		});
	});
	test.describe('Unauthenticated', () => {
		test.use(NO_AUTH_STATE);
		test.beforeEach(async ({ page }) => {
			await page.goto('/profile');
		});

		test('should be redirected to login', async ({ page }) => {
			await page.waitForURL('/login*', { timeout: 1000 });
			await expect(page.getByRole('heading', { name: 'Unauthorized' })).toBeVisible();
		});
	});
});
