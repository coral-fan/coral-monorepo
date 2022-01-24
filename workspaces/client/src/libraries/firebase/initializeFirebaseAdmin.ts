import { SERVER_ENVIRONMENT } from 'consts';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

const getCredential = (): string | Record<string, string> => {
  if (!process.env.FIREBASE_ADMIN_CREDENTIAL) {
    throw Error(getEnvironmentVariableErrorMessage('FIREBASE_ADMIN_CREDENTIAL'));
  }
  if (SERVER_ENVIRONMENT === 'production') {
    return JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL);
  } else {
    return process.env.FIREBASE_ADMIN_CREDENTIAL;
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
