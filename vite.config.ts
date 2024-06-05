import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
	plugins: [
		sveltekit(),
		istanbul({
			include: 'src/*',
			exclude: ['node_modules', 'test/', '**/*.test.ts', 'src/lib/components/ui/*'],
			extension: ['.ts', '.svelte'],
			requireEnv: false,
			forceBuildInstrument: process.env.NODE_ENV === 'DEV'
		})
	],
	optimizeDeps: {
		include: [
			'lodash',
			'mode-watcher',
			'lucide-svelte/icons/sun',
			'lucide-svelte/icons/moon',
			'zod',
			'ts-deepmerge',
			'@sinclair/typebox/compiler',
			'@sinclair/typebox',
			'valibot',
			'@gcornut/valibot-json-schema',
			'yup',
			'zod-to-json-schema',
			'@vinejs/vine',
			'just-clone',
			'memoize-weak',
			'bits-ui',
			'sveltekit-superforms',
			'sveltekit-superforms/adapters',
			'lucide-svelte',
			'formsnap',
			'lucide-svelte/icons/circle-alert'
		]
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTests.ts',
		coverage: {
			exclude: ['src/lib/components/ui/*'],
			provider: 'istanbul',
			reporter: ['json'],
			reportsDirectory: '.nyc_output'
		}
	}
});
