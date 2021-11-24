import { SERVER_ENVIRONMENT } from 'consts';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

export const getFirebaseAdmin = async () => {
  // needs async import or will throw error in console on client due to importing it client side
  const admin = await import('firebase-admin');
  // checks if admin has been initialized already
  if (admin.apps.length < 1) {
    if (SERVER_ENVIRONMENT === 'production') {
      admin.initializeApp();
    } else {
      if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
        throw Error(getEnvironmentVariableErrorMessage('FIREBASE_ADMIN_CREDENTIALS'));
      }
      const credentialPath = process.env.FIREBASE_ADMIN_CREDENTIALS;

      admin.initializeApp({
        credential: admin.credential.cert(credentialPath),
      });
    }
  }
  return admin;
};
