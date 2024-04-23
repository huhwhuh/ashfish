// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const devFirebaseConfig = {
	apiKey: 'AIzaSyBgXlheLtqyCrSLWyNlcITXC7hgAoYMU5s',
	authDomain: 'ashfish-dev.firebaseapp.com',
	databaseURL: 'https://ashfish-dev-default-rtdb.firebaseio.com',
	projectId: 'ashfish-dev',
	storageBucket: 'ashfish-dev.appspot.com',
	messagingSenderId: '459142839624',
	appId: '1:459142839624:web:e93aabce74e987d93a477d'
};
const releaseFirebaseConfig = {
	apiKey: 'AIzaSyBPAqA0IEJEo27Dc5rNDPcS8GT_bd8q35o',
	authDomain: 'ashfish-release.firebaseapp.com',
	databaseURL: 'https://ashfish-release-default-rtdb.firebaseio.com',
	projectId: 'ashfish-release',
	storageBucket: 'ashfish-release.appspot.com',
	messagingSenderId: '746011965159',
	appId: '1:746011965159:web:8788b3ea78eb3e16fad442',
	measurementId: 'G-2XVHVZ84S6'
};
const prodFirebaseConfig = {
	apiKey: 'AIzaSyC6YBn4lsuyUjX04MWKAlbL5kR8VXgp2pQ',
	authDomain: 'ashfish-prod.firebaseapp.com',
	projectId: 'ashfish-prod',
	storageBucket: 'ashfish-prod.appspot.com',
	messagingSenderId: '961605603212',
	appId: '1:961605603212:web:94461ab35aab71c16c50a9',
	databaseURL: 'https://ashfish-prod-default-rtdb.firebaseio.com/',
	measurementId: 'G-FGRRYPGTPP'
};

let firebaseConfig;
switch (process.env.STAGE) {
	case 'PROD':
		firebaseConfig = prodFirebaseConfig;
		break;
	case 'RELEASE':
		firebaseConfig = releaseFirebaseConfig;
		break;
	case 'DEV':
		firebaseConfig = devFirebaseConfig;
		break;
	default:
		throw Error('Environment variable STAGE needs to be set!');
}
// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
