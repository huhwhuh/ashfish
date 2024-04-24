import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/components/forms/login/schema';

export const load = (async () => {
	return { form: await superValidate(zod(loginSchema)) };
}) satisfies PageLoad;
