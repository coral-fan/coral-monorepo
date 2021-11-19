import admin from 'firebase-admin';

export const getFirebaseAdmin = () => {
  // checks if admin has been initialized already
  if (admin.apps.length < 1) {
    if (process.env.NODE_ENV === 'development') {
      const localCredentialPath =
        /* eslint-disable-next-line @typescript-eslint/no-var-requires -- this prevents the require statement from causing linting error */
        (require('dotenv').config() && process.env.LOCAL_FIREBASE_CREDENTIALS) as string;
      admin.initializeApp({
        credential: admin.credential.cert(localCredentialPath),
      });
    } else {
      admin.initializeApp();
    }
  }
  return admin;
};
