import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import pkg from 'firebase-admin';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';
import memoize from 'lodash/memoize';

const adminFirebaseConfig = {
	credential: pkg.credential.cert({
		projectId: FB_PROJECT_ID,
		clientEmail: FB_CLIENT_EMAIL,
		privateKey: FB_PRIVATE_KEY.replace(/\\n/gm, '\n')
	})
};

export const initAdminFirebase = memoize(() => {
	const adminApp = pkg.initializeApp(adminFirebaseConfig);
	const adminAuth = getAuth(adminApp);
	const adminDB = getFirestore();
	return { adminApp, adminAuth, adminDB };
});
