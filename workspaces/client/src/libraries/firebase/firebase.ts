import { initializeApp, getApps } from '@firebase/app';

export const initializeFirebaseApp = () => {
  // getApps() checks if any apps have been initialized and prevents re-initialization of Firebase SDK during hot reloads
  if (getApps().length < 1) {
    /* 
    initialize Firebase using Web version 9 (modular), so authorization is handled by library
    https://firebase.google.com/docs/firestore/quickstart#set_up_your_development_environment
    */
    const firebaseConfig = {
      apiKey: 'AIzaSyAjdS0N93SLZUkiYgdwxE_7sNjX0gXZc-E',
      authDomain: 'coral-c373f.firebaseapp.com',
      projectId: 'coral-c373f',
      storageBucket: 'coral-c373f.appspot.com',
      messagingSenderId: '805666237729',
      appId: '1:805666237729:web:ddd1fb95078d202d15a260',
      measurementId: 'G-91HP8670JW',
    };
    initializeApp(firebaseConfig);
  }
};
