import { expect, test as setup } from '@playwright/test';
import { USER_AUTH_PATH } from '../playwright.config';
import * as fs from 'fs';

setup('authenticate as user', async ({ page }) => {
	const stats = fs.existsSync(USER_AUTH_PATH!.toString())
		? fs.statSync(USER_AUTH_PATH!.toString())
		: null;
	if (stats && stats.mtimeMs > new Date().getTime() - 600000) {
		console.log(`\x1b[2m\tSign in skipped because token is fresh\x1b[0m`);
		return;
	}
	await page.goto('/login');
	await expect(page.getByText('Running in emulator mode. Do')).toBeVisible();
	await page.getByLabel('Email').fill('verified@test.com');
	await page.getByLabel('Password').fill('test1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
	// await page.waitForURL('/profile');
	await page.context().storageState({ path: USER_AUTH_PATH });
});
