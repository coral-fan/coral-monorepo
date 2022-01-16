import admin from 'firebase-admin';

export const getFirebaseAdmin = () => {
  // checks if admin has been initialized already
  if (admin.apps.length < 1) {
    if (process.env.NODE_ENV === 'development') {
      require('dotenv').config();

      const localCredentialPath = process.env.LOCAL_FIREBASE_CREDENTIALS;

      if (localCredentialPath === undefined) {
        throw Error('Please provide a value for LOCAL_FIREBASE_CREDENTIALS in .env file.');
      }

      admin.initializeApp({
        credential: admin.credential.cert(localCredentialPath),
      });
    } else {
      admin.initializeApp();
    }
  }
  return admin;
};
