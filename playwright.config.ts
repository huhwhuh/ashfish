import { devices, type PlaywrightTestConfig } from '@playwright/test';

export const USER_AUTH_PATH = 'tests/.auth/user.json';
// export const USER_AUTH_STATE = { storageState: USER_AUTH_PATH };
export const NO_AUTH_STATE = { storageState: { cookies: [], origins: [] } };
const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		url: 'http://localhost:5173',
		reuseExistingServer: !process.env.CI,
		stdout: 'ignore',
		stderr: 'pipe'
	},
	use: {
		baseURL: 'http://localhost:5173/',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		ignoreHTTPSErrors: true
	},
	fullyParallel: true,
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	testDir: 'tests',
	projects: [
		// Setup project
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/
		},

		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				storageState: 'tests/.auth/user.json'
			},
			dependencies: ['setup']
		}
		//
		// {
		// 	name: 'firefox',
		// 	use: {
		// 		...devices['Desktop Firefox'],
		// 		// Use prepared auth state.
		// 		storageState: USER_AUTH_PATH
		// 	},
		// 	dependencies: ['setup']
		// }
	]
};
export default config;
