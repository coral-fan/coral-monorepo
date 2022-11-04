import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { getEarnCode, getUidServerSide, ReferralData } from 'libraries/models';
import { z } from 'zod';
import { ERROR_RESPONSE } from './consts';
import { Handler } from './types';
import { getHandler } from './utils';

const GenerateReferralCodeRequestBody = z.object({
  collectionId: z.string(),
  campaignId: z.string(),
});

const post: Handler = async (req, res) => {
  const { collectionId, campaignId } = GenerateReferralCodeRequestBody.parse(req.body);

  try {
    const uid = await getUidServerSide(req);
    const referralCode = getEarnCode(uid, campaignId);

    const referralDocRef = await getDocumentReferenceServerSide<ReferralData>(
      'referrals',
      referralCode
    );

    const referralDocSnapshot = await referralDocRef.get();

    if (!referralDocSnapshot.exists) {
      referralDocRef.set({
        campaignId,
        collectionId,
        userId: uid,
        createdAt: new Date().toISOString(),
        seenFingerprints: [],
        visits: 0,
        uniqueVisits: 0,
        conversions: 0,
      });

      const userPointsAccountsDocRef = await getDocumentReferenceServerSide(
        'user-points-accounts',
        uid
      );

      const userPointsAccountsDocSnapshot = await userPointsAccountsDocRef.get();

      if (!userPointsAccountsDocSnapshot.exists) {
        userPointsAccountsDocRef.set({ pointsBalance: 0 });
      }

      return res.status(200).send({ referralCode });
    } else {
      throw new Error(
        `Referral code for user with id ${uid} for campaign ${campaignId} already exists`
      );
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
