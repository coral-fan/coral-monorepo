import { SERVER_ENVIRONMENT } from 'consts';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

const getServiceAccount = () => {
  if (SERVER_ENVIRONMENT === 'production') {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      throw Error(getEnvironmentVariableErrorMessage('FIREBASE_SERVICE_ACCOUNT_JSON'));
    }
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else {
    if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
      throw Error(getEnvironmentVariableErrorMessage('FIREBASE_ADMIN_CREDENTIALS'));
    }
    return process.env.FIREBASE_ADMIN_CREDENTIALS;
  }
};

export const initializeFirebaseAdmin = async () => {
  const { getApps } = await import('firebase-admin/app');
  // checks if admin has been initialized already
  if (getApps().length < 1) {
    const { initializeApp, cert } = await import('firebase-admin/app');
    const serviceAccount = getServiceAccount();
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
};
