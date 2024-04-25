import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/authutils';

export const load = (async (event) => {
	if (!event.locals.userID) {
		throw redirect(302, handleLoginRedirect(event));
	}
}) satisfies PageServerLoad;
