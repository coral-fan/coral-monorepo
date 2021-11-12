import admin from 'firebase-admin';

export const getFirebaseAdmin = () => {
  // checks if admin has been initialized already
  if (admin.apps.length < 1) {
    const credentialPath = (
      process.env.GCLOUD_PROJECT
        ? /* eslint-disable @typescript-eslint/no-var-requires -- this prevents the require statement from causing linting error */
          require('dotenv').config() && process.env.LOCAL_FIREBASE_CREDENTIALS
        : process.env.GOOGLE_APPLICATION_CREDENTIALS
    ) as string;

    admin.initializeApp({
      credential: admin.credential.cert(credentialPath),
    });
  }
  return admin;
};
