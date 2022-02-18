import { SERVER_ENVIRONMENT } from 'consts';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

const getCredential = (): string | Record<string, string> => {
  if (SERVER_ENVIRONMENT === 'production') {
    if (!process.env.FIREBASE_ADMIN_CREDENTIAL_JSON) {
      throw Error(getEnvironmentVariableErrorMessage('FIREBASE_ADMIN_CREDENTIAL_JSON'));
    }
    return JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL_JSON);
  } else {
    if (!process.env.FIREBASE_ADMIN_CREDENTIAL_PATH) {
      throw Error(getEnvironmentVariableErrorMessage('FIREBASE_ADMIN_CREDENTIAL_PATH'));
    }
    return process.env.FIREBASE_ADMIN_CREDENTIAL_PATH;
  }
};

export const initializeFirebaseAdmin = async () => {
  const { getApps } = await import('firebase-admin/app');
  // checks if admin has been initialized already
  if (getApps().length < 1) {
    const { initializeApp, cert } = await import('firebase-admin/app');
    const serviceAccount = getCredential();
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
};
