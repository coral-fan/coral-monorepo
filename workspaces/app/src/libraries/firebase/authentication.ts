import { initializeFirebaseAdmin } from '.';

export const getAuthenticationServerSide = async () => {
  await initializeFirebaseAdmin();

  const { getApp } = await import('firebase-admin/app');
  const app = getApp();

  const { getAuth } = await import('firebase-admin/auth');

  const auth = getAuth(app);

  return auth;
};
