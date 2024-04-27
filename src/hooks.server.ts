import type { Handle } from '@sveltejs/kit';
import { initAdminFirebase } from '$lib/server/admin';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('__session');

	try {
		const { adminAuth } = initAdminFirebase();
		const decodedToken = await adminAuth.verifySessionCookie(sessionCookie!);
		const { uid, name, email } = decodedToken;
		event.locals.user = { uid, name, email: email! };
		console.log('authenticated user', decodedToken.uid, 'trying to access', event.url.href);
	} catch (e) {
		console.log('unauthenticated user trying to access', event.url.href);
		event.locals.user = null;
		event.cookies.delete('__session', { path: '/' });
		return resolve(event);
	}

	return resolve(event);
}) satisfies Handle;
