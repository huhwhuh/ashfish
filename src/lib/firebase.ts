// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import {
	browserLocalPersistence,
	connectAuthEmulator,
	getAuth,
	setPersistence,
	signOut
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
	PUBLIC_FB_APIKEY,
	PUBLIC_FB_APPID,
	PUBLIC_FB_AUTHDOMAIN,
	PUBLIC_FB_DATABASEURL,
	PUBLIC_FB_PROJECTID,
	PUBLIC_FB_STORAGEBUCKET
} from '$env/static/public';
import { goto, invalidateAll } from '$app/navigation';
import memoize from 'lodash/memoize';

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
export const initFirebase = memoize(() => {
	const clientApp = initializeApp(firebaseConfig);
	const clientAuth = getAuth(clientApp);
	const clientDB = getFirestore();
	const clientStorage = getStorage();
	connectAuthEmulator(clientAuth, 'http://localhost:9099');
	connectFirestoreEmulator(clientDB, 'localhost', 8080);
	setPersistence(clientAuth, browserLocalPersistence).then(() => {});
	return { clientApp, clientAuth, clientDB, clientStorage };
});

export async function logout() {
	const { clientAuth } = initFirebase();
	await goto('/');
	await fetch('/api/auth/login', { method: 'DELETE' });
	await signOut(clientAuth);
	await invalidateAll();
}
