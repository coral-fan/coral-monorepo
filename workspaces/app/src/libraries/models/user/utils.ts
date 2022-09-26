import { getDocumentData } from 'libraries/firebase';
import { IsUserSigningUpData, PublicUserData } from '.';
import { destroyCookie, parseCookies } from 'nookies';

import { COOKIE_OPTIONS, ID_TOKEN_KEY } from 'consts';

import { initializeFirebaseAdmin } from 'libraries/firebase';
import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { User } from './types';
import { NextApiRequest } from 'next';
import { z } from 'zod';

type Context = Parameters<typeof parseCookies>[0] & Parameters<typeof destroyCookie>[0];

const GenerateReferralCodeCookies = z.object({
  id_token: z.string(),
});

const isNextApiResponse = (ctxOrReq: Context | NextApiRequest): ctxOrReq is NextApiRequest =>
  ctxOrReq?.hasOwnProperty('cookies') ?? false;

export async function getUidServerSide(req: NextApiRequest): Promise<string>;
export async function getUidServerSide(ctx: Context): Promise<string | undefined>;

export async function getUidServerSide(ctxOrReq: Context | NextApiRequest) {
  await initializeFirebaseAdmin();

  try {
    const { getApp } = await import('firebase-admin/app');
    const app = getApp();
    const { getAuth } = await import('firebase-admin/auth');
    const cookies = isNextApiResponse(ctxOrReq) ? ctxOrReq.cookies : parseCookies(ctxOrReq);
    const { id_token } = GenerateReferralCodeCookies.parse(cookies);
    const { uid } = await getAuth(app).verifyIdToken(id_token);
    return uid;
  } catch (e) {
    if (isNextApiResponse(ctxOrReq)) {
      throw e;
    } else {
      destroyCookie(ctxOrReq, ID_TOKEN_KEY, COOKIE_OPTIONS);
      return undefined;
    }
  }
}

export const getUidClientSide = () => getAuth(getApp()).currentUser?.uid;

export const getIsUserSigningUp = async (id: User['id']) => {
  const isUserSigningUpData = await getDocumentData<IsUserSigningUpData>('is-signing-up', id);

  return isUserSigningUpData?.isSigningUp ?? false;
};

export const getPublicUserData = (id: User['id']) => getDocumentData<PublicUserData>('users', id);
