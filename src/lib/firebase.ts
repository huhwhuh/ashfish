// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth, onAuthStateChanged, signOut, type User } from '@firebase/auth';
import { getStorage } from '@firebase/storage';
import {
	PUBLIC_FB_APIKEY,
	PUBLIC_FB_APPID,
	PUBLIC_FB_AUTHDOMAIN,
	PUBLIC_FB_DATABASEURL,
	PUBLIC_FB_PROJECTID,
	PUBLIC_FB_STORAGEBUCKET
} from '$env/static/public';
import { writable } from 'svelte/store';

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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
// connectFirestoreEmulator(db, 'firebase', 8080);
// connectAuthEmulator(auth, 'http://localhost:9099');

/**
 * @returns a store with the current firebase user
 */
function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
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
	await signOut(auth);
}

export const user = userStore();
