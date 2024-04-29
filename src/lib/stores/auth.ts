import { derived } from 'svelte/store';
import { page } from '$app/stores';

export type User = {
	name: string;
	uid: string;
	email: string;
};

export const user = derived<typeof page, User | null>(
	page,
	($page, set) => {
		const { user } = $page.data;
		if (!user) {
			set(null);
			return;
		}
		set(user);
	},
	null
);
