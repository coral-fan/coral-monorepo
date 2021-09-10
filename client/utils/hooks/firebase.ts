import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAgiH9P3HVDWmnFZvpgP8nvIpjB93LdBD0',
  authDomain: 'torus-tutorial.firebaseapp.com',
  projectId: 'torus-tutorial',
  storageBucket: 'torus-tutorial.appspot.com',
  messagingSenderId: '421605888175',
  appId: '1:421605888175:web:f3571744c16e97bbbb045a',
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth();
const db = getFirestore();
