import { test, expect } from './baseFixtures';
import { NO_AUTH_STATE } from '../playwright.config';

test.describe('Login', () => {
	test.use(NO_AUTH_STATE);
	test.beforeEach(async ({ page }) => {
		await page.goto('/login');
		await expect(page.getByText('Running in emulator mode. Do')).toBeVisible();
	});
	test('Cookie is set', async ({ page }) => {
		await page.getByLabel('Email').fill('unverified@test.com');
		await page.getByLabel('Password').fill('test1234');
		await page.getByRole('button', { name: 'Login' }).click();
		await page.waitForURL('/');
		const cookies = await page.context().cookies();
		expect(
			cookies.find((cookie) => cookie.domain === 'localhost' && cookie.name === '__session')?.name
		).toEqual('__session');
	});
});
