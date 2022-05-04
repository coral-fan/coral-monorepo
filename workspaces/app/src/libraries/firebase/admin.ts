import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

export const initializeFirebaseAdmin = async () => {
  const { getApps } = await import('firebase-admin/app');
  // checks if admin has been initialized already
  if (getApps().length < 1) {
    if (process.env.FIREBASE_ADMIN_CREDENTIAL_JSON === undefined) {
      throw getEnvironmentVariableErrorMessage('FIREBASE_ADMIN_CREDENTIAL_JSON');
    }

    const { initializeApp, cert } = await import('firebase-admin/app');
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL_JSON);
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
};
