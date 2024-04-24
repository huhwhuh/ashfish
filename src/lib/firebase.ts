// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore';
import {
	connectAuthEmulator,
	getAuth,
	onAuthStateChanged,
	signOut,
	type User
} from '@firebase/auth';
import { getStorage } from '@firebase/storage';
import {
	PUBLIC_FB_APIKEY,
	PUBLIC_FB_APPID,
	PUBLIC_FB_AUTHDOMAIN,
	PUBLIC_FB_DATABASEURL,
	PUBLIC_FB_PROJECTID,
	PUBLIC_FB_STORAGEBUCKET,
	PUBLIC_STAGE
} from '$env/static/public';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: PUBLIC_FB_APIKEY,
	authDomain: PUBLIC_FB_AUTHDOMAIN,
	databaseURL: PUBLIC_FB_DATABASEURL,
	projectId: PUBLIC_FB_PROJECTID,
	storageBucket: PUBLIC_FB_STORAGEBUCKET,
	messagingSenderId: PUBLIC_FB_STORAGEBUCKET,
	appId: PUBLIC_FB_APPID
};
// Initialize Firebase
export const clientFirebaseApp = initializeApp(firebaseConfig);
export const clientDB = getFirestore();
export const clientAuth = getAuth();
export const storage = getStorage();

if (PUBLIC_STAGE === 'DEV') {
	connectAuthEmulator(clientAuth, 'http://localhost:9099');
	connectFirestoreEmulator(clientDB, 'localhost', 8080);
}

/**
 * @returns a store with the current firebase user
 */
function userStore() {
	let unsubscribe: () => void;

	if (!clientAuth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(clientAuth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(clientAuth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export async function logout() {
	await fetch('/api/auth/login', { method: 'DELETE' });
	await signOut(clientAuth);
	await goto('/');
}

export const user = userStore();
