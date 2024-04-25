import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/components/forms/login/schema';

export const load = (async (event) => {
	const ref = event.url.searchParams.get('ref') || '/';
	const message = event.url.searchParams.get('message') || '';
	return {
		form: await superValidate(zod(loginSchema)),
		ref: ref,
		message: message
	};
}) satisfies PageLoad;
