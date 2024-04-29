import { writable } from 'svelte/store';
import type { User } from '$lib/stores/auth';

export const mockUserStore = writable<User | null>(null);
