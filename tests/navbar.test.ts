import { expect, test } from '@playwright/test';
import { NO_AUTH_STATE } from '../playwright.config';

test.describe('Navbar', () => {
	test.describe('Authenticated', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('');
			await expect(page.getByText('Running in emulator mode. Do')).toBeVisible();
		});
		test('Logout visible', async ({ page }) => {
			await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
		});
	});
	test.describe('Unauthenticated', () => {
		test.use({ ...NO_AUTH_STATE });
		test.beforeEach(async ({ page }) => {
			await page.goto('');
		});
		test('Login visible', async ({ page }) => {
			await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
		});
		test('Theme button visible', async ({ page }) => {
			await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
		});
		test('Home button visible', async ({ page }) => {
			await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
		});
		test('Chat button visible', async ({ page }) => {
			await expect(page.getByRole('link', { name: 'Chat' })).toBeVisible();
		});
		test('Profile button visible', async ({ page }) => {
			await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
		});
	});
});
