import admin from 'firebase-admin';

export default function getFirebaseAdmin() {
  // checks if admin has been initialized already
  if (admin.apps.length < 1) {
    const credentialPath = (
      process.env.GCLOUD_PROJECT
        ? require('dotenv').config() && process.env.LOCAL_FIREBASE_CREDENTIALS
        : process.env.GOOGLE_APPLICATION_CREDENTIALS
    ) as string;

    admin.initializeApp({
      credential: admin.credential.cert(credentialPath),
    });
  }
  return admin;
}
