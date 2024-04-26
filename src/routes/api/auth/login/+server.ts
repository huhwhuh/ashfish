import { error, json, type RequestHandler } from '@sveltejs/kit';
import { initAdminFirebase } from '$lib/server/admin';
import { invalidateAll } from '$app/navigation';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { adminAuth } = initAdminFirebase();
	const { idToken } = await request.json();

	const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

	const decodedIdToken = await adminAuth.verifyIdToken(idToken);
	if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 5 * 60) {
		throw error(401, 'Recent log in required!');
	}

	const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
	const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

	cookies.set('__session', cookie, options);

	return json({ status: 'success' });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	const { adminAuth } = initAdminFirebase();

	const sessionCookie = cookies.get('__session') || '';
	try {
		cookies.delete('__session', { path: '/' });
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
		await adminAuth.revokeRefreshTokens(decodedClaims.sub);
		await invalidateAll();
		return json({ status: 'success' });
	} catch (err) {
		return json({ status: 'success' });
	}
};
