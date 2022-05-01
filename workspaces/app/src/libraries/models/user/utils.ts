import { getDocumentData } from 'libraries/firebase';
import { IsUserSigningUpData, PublicUserData } from '.';
import { destroyCookie, parseCookies } from 'nookies';
<<<<<<< HEAD
import { COOKIE_OPTIONS, ID_TOKEN_KEY } from 'consts';
=======
import { AVALANCHE, COOKIE_OPTIONS } from 'consts';
>>>>>>> 691578d9 (Add getPublicUserData utility function)
import { initializeFirebaseAdmin } from 'libraries/firebase';
import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { getCovalentTokenBalanceApiUrl, TokenData } from 'libraries/blockchain/wallet/observables';
import axios from 'axios';

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

export const getIsUserSigningUp = async (uid: string) => {
  const isUserSigningUpData = await getDocumentData<IsUserSigningUpData>('is-signing-up', uid);

  return isUserSigningUpData?.isSigningUp ?? false;
};

export const getPublicUserData = async (uid: PublicUserData['id']) => {
  const data = await getDocumentData<PublicUserData>('users', uid);

  if (!data) {
    return;
  }

  return { ...data };
};
