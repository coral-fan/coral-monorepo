import { getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { getReferralCode } from 'libraries/models';
import { z } from 'zod';
import { ERROR_RESPONSE } from './consts';
import { Handler } from './types';
import { getHandler } from './utils';

const GenerateReferralCodeRequestBody = z.object({
  collectionId: z.string(),
  campaignId: z.string(),
});

const GenerateReferralCodeCookies = z.object({
  id_token: z.string(),
});

const post: Handler = async (req, res) => {
  const { collectionId, campaignId } = GenerateReferralCodeRequestBody.parse(req.body);
  const { id_token } = GenerateReferralCodeCookies.parse(req.cookies);

  try {
    const app = getApp();
    const { uid } = await getAuth(app).verifyIdToken(id_token);
    const referralCode = getReferralCode(uid, collectionId);

    const referralDocRef = await getDocumentReferenceServerSide('referrals', referralCode);

    const referralDocSnapshot = await referralDocRef.get();

    if (!referralDocSnapshot.exists) {
      referralDocRef.set({
        campaignId,
        collectionId,
        userId: uid,
        createdAt: new Date().toISOString(),
      });

      const userReferralAccountsDocRef = await getDocumentReferenceServerSide(
        'user-referral-accounts',
        uid
      );

      const userReferralAccountsDocSnapshot = await userReferralAccountsDocRef.get();

      if (!userReferralAccountsDocSnapshot.exists) {
        userReferralAccountsDocRef.set({ pointsBalance: 0 });
      }

      return res.status(200).send({ referralCode });
    } else {
      throw new Error(
        `Referral code for user with id ${uid} for collection ${collectionId} already exists`
      );
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
