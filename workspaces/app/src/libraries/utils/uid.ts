import { destroyCookie, parseCookies } from 'nookies';
import { COOKIE_OPTIONS } from 'consts';
import { initializeFirebaseAdmin } from 'libraries/firebase';
import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';

type Context = Parameters<typeof parseCookies>[0] & Parameters<typeof destroyCookie>[0];

export const getUidServerSide = async (ctx: Context) => {
  await initializeFirebaseAdmin();
  try {
    const { getApp } = await import('firebase-admin/app');
    const app = getApp();
    const { getAuth } = await import('firebase-admin/auth');
    const cookies = parseCookies(ctx);
    const { uid } = await getAuth(app).verifyIdToken(cookies.token);
    return uid;
  } catch (_) {
    destroyCookie(ctx, 'token', COOKIE_OPTIONS);
    return undefined;
  }
};

export const getUidClientSide = () => getAuth(getApp()).currentUser?.uid;
