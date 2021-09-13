import { initializeApp, getApps } from '@firebase/app';

export const initializeFirebaseApp = () => {
  // getApps() checks if any apps have been initialized and prevents re-initialization of Firebase SDK during hot reloads
  if (getApps().length < 1) {
    /* 
    initialize Firebase using Web version 9 (modular), so authorization is handled by library
    https://firebase.google.com/docs/firestore/quickstart#set_up_your_development_environment
    */
    const firebaseConfig = {
      apiKey: 'AIzaSyAgiH9P3HVDWmnFZvpgP8nvIpjB93LdBD0',
      authDomain: 'torus-tutorial.firebaseapp.com',
      projectId: 'torus-tutorial',
      storageBucket: 'torus-tutorial.appspot.com',
      messagingSenderId: '421605888175',
      appId: '1:421605888175:web:f3571744c16e97bbbb045a',
    };
    initializeApp(firebaseConfig);
  }
};
