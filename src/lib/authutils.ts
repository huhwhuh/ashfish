import { type RequestEvent } from '@sveltejs/kit';

export function handleLoginRedirect(
	event: RequestEvent,
	message: string = 'You must be logged in to view this page!'
) {
	const fromUrl = event.url.pathname + event.url.search;
	return `/login?ref=${fromUrl}&message=${message}`;
}
