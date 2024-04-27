import { test, expect } from '@playwright/test';
import { NO_AUTH_STATE } from '../playwright.config';

test.describe('Logout', () => {
	test.use(NO_AUTH_STATE);
	test.beforeEach(async ({ page }) => {
		await page.goto('/login');
		await expect(page.getByText('Running in emulator mode. Do')).toBeVisible();
		await page.getByLabel('Email').fill('unverified@test.com');
		await page.getByLabel('Password').fill('test1234');
		await page.getByRole('button', { name: 'Login' }).click();
		await page.waitForURL('/');
	});
	test('Cookie is deleted', async ({ page }) => {
		await page.getByRole('button', { name: 'Logout' }).click();
		await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
		const cookies = await page.context().cookies();
		expect(
			cookies.find((cookie) => cookie.domain === 'localhost' && cookie.name === '__session')?.name
		).toEqual(undefined);
	});
	test('Other logged in sessions invalidated', async ({ page, browser }) => {
		await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
		const otherContext = await browser.newContext();
		const otherPage = await otherContext.newPage();
		await otherPage.goto('/login');
		await expect(otherPage.getByText('Running in emulator mode. Do')).toBeVisible();
		await otherPage.getByLabel('Email').fill('unverified@test.com');
		await otherPage.getByLabel('Password').fill('test1234');
		await otherPage.getByRole('button', { name: 'Login' }).click();
		await otherPage.getByRole('button', { name: 'Logout' }).click();
		await expect(otherPage.getByRole('link', { name: 'Login' })).toBeVisible();
		await otherPage.close();
		await otherContext.close();
		await page.reload();
		await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
		const cookies = await page.context().cookies();
		expect(
			cookies.find((cookie) => cookie.domain === 'localhost' && cookie.name === '__session')?.name
		).toEqual(undefined);
	});
});
