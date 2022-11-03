import { getDocumentData, getDocumentReferenceServerSide } from 'libraries/firebase';

import { CollectionData, getEarnCode, ReferralData } from 'libraries/models';

const uid = '0xA34D4367Bd647B996b1e2A790073e9022fa73De8';
const collectionId = '0xcB846098C5f6a86D9775a183F80aFdF174eD1171';

const addReferralCode = async () => {
  console.log(`Adding referral code to ${collectionId}`);

  const collectionData = await getDocumentData<CollectionData>('collections', collectionId);

  if (!collectionData?.activeCampaign) {
    throw new Error(`Collection ${collectionId} does not have an active campaign...`);
  }

  const campaignId = collectionData.activeCampaign;

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

    const userReferralAccountsDocRef = await getDocumentReferenceServerSide(
      'user-points-accounts',
      uid
    );

    const userReferralAccountsDocSnapshot = await userReferralAccountsDocRef.get();

    if (!userReferralAccountsDocSnapshot.exists) {
      userReferralAccountsDocRef.set({ pointsBalance: 0 });
    }
    console.log(
      `Referral code ${referralCode} created for collection ${collectionId} and user ${uid} `
    );
  } else {
    throw new Error(
      `Referral code for user with id ${uid} for collection ${collectionId} already exists`
    );
  }
};

addReferralCode();
