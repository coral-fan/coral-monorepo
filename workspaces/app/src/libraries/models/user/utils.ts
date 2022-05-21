import { getDocumentData } from 'libraries/firebase';
import { IsUserSigningUpData, PublicUserData } from '.';
import { destroyCookie, parseCookies } from 'nookies';

import { COOKIE_OPTIONS, ID_TOKEN_KEY } from 'consts';

import { initializeFirebaseAdmin } from 'libraries/firebase';
import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { User } from './types';

type Context = Parameters<typeof parseCookies>[0] & Parameters<typeof destroyCookie>[0];

export const getUidServerSide = async (ctx: Context) => {
  await initializeFirebaseAdmin();
  try {
    const { getApp } = await import('firebase-admin/app');
    const app = getApp();
    const { getAuth } = await import('firebase-admin/auth');
    // TODO: think of way to globally type cookies more strictly
    const cookies = parseCookies(ctx);
    const { uid } = await getAuth(app).verifyIdToken(cookies[ID_TOKEN_KEY]);
    return uid;
  } catch (_) {
    destroyCookie(ctx, ID_TOKEN_KEY, COOKIE_OPTIONS);
    return undefined;
  }
};

export const getUidClientSide = () => getAuth(getApp()).currentUser?.uid;

export const getIsUserSigningUp = async (id: User['id']) => {
  const isUserSigningUpData = await getDocumentData<IsUserSigningUpData>('is-signing-up', id);

  return isUserSigningUpData?.isSigningUp ?? false;
};

export const getPublicUserData = (id: User['id']) => getDocumentData<PublicUserData>('users', id);
