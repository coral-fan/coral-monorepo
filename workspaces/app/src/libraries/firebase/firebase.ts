import { initializeApp, getApps } from '@firebase/app';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';

export const initializeFirebaseApp = () => {
  // getApps() checks if any apps have been initialized and prevents re-initialization of Firebase SDK during hot reloads
  if (getApps().length < 1) {
    if (!process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
      throw getEnvironmentVariableErrorMessage('NEXT_PUBLIC_FIREBASE_CONFIG');
    }

    const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
    /* 
    initialize Firebase using Web version 9 (modular), so authorization is handled by library
    https://firebase.google.com/docs/firestore/quickstart#set_up_your_development_environment
    */
    initializeApp(firebaseConfig);
  }
};
