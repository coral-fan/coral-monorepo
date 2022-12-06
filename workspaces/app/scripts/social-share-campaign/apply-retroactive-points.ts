import {
  getCollectionReferenceServerSide,
  getDocumentReferenceServerSide,
  getFirestoreServerSide,
} from 'libraries/firebase';

import { getTimeInsideWindow } from 'libraries/time';
import { getDoesOwnToken } from 'libraries/blockchain/utils';
import { PINDER_MULTIPLE, PINDER_NFT_CONTRACT_ADDRESS } from 'consts';
import { SocialShareCampaignData } from 'libraries/models';
import { FieldValue } from 'firebase-admin/firestore';

const SOCIAL_SHARE_CAMPAIGN_ID = 'ukgEh7yJJABKyxRRf60l';

const applyRetroactivePoints = async () => {
  console.log('Apply points retroactively...');

  const socialShareCampaignRef = await getDocumentReferenceServerSide(
    'social-share-campaigns',
    SOCIAL_SHARE_CAMPAIGN_ID
  );

  const socialShareCampaignData = (
    await socialShareCampaignRef.get()
  ).data() as SocialShareCampaignData;

  if (!socialShareCampaignData) {
    throw Error(`Social Share Campaign with ID ${SOCIAL_SHARE_CAMPAIGN_ID} not found`);
  }

  console.log(`Social Share Campaign ${SOCIAL_SHARE_CAMPAIGN_ID} found`);

  const { pointsValue, isActive, startDate, endDate, totalPointsEarned, totalPointsPool } =
    socialShareCampaignData;

  const socialShareTransactionsRef = await getCollectionReferenceServerSide(
    'social-share-transactions'
  );

  // check campaign is active
  if (!isActive) {
    throw new Error(`Social share campaign (${SOCIAL_SHARE_CAMPAIGN_ID}) is not currently active.`);
  }

  // check current time is between startDate and endDate
  const isInsideTimeWindow = getTimeInsideWindow(startDate, endDate);
  if (!isInsideTimeWindow) {
    throw new Error(
      `Social share campaign (${SOCIAL_SHARE_CAMPAIGN_ID}) has not started yet or is already over.`
    );
  }

  // Get all social-share-transactions for this campaignId where only 10 points were earned
  const socialShareTransactionsRes = await socialShareTransactionsRef
    .where('campaignId', '==', SOCIAL_SHARE_CAMPAIGN_ID)
    .where('pointsEarned', '==', pointsValue)
    .get();

  console.log(`${socialShareTransactionsRes.size} points transactions need to be evaluated`);

  const firestore = await getFirestoreServerSide();
  socialShareTransactionsRes.forEach(async (doc) => {
    try {
      await firestore.runTransaction(async (transaction) => {
        const { userId, pointsEarned } = doc.data();
        const appliedPointsValue = pointsEarned * PINDER_MULTIPLE;
        const pointsDiff = appliedPointsValue - pointsEarned;

        console.log(`Checking user ${userId}...`);

        // check if user owns the NFT
        const doesOwnEthNft = await getDoesOwnToken(PINDER_NFT_CONTRACT_ADDRESS, userId, false);

        if (doesOwnEthNft) {
          console.log(`User ${userId} owns the NFT`);
          const socialShareTransactionsDocRef = await getDocumentReferenceServerSide(
            'social-share-transactions',
            doc.id
          );

          const userPointsEarnedTransactionsRef = await getDocumentReferenceServerSide(
            `user-points-accounts/${userId}/pointsEarnedTransactions`,
            doc.id
          );

          const userPointsAccountDocRef = await getDocumentReferenceServerSide(
            'user-points-accounts',
            userId
          );

          if (totalPointsEarned + pointsDiff > totalPointsPool) {
            throw Error(
              `Adding points to user ${userId} for the ${doc.id} transaction will exceed the total points pool`
            );
          }

          transaction.update(socialShareTransactionsDocRef, { pointsEarned: appliedPointsValue });
          transaction.update(userPointsEarnedTransactionsRef, { pointsEarned: appliedPointsValue });
          transaction.update(
            userPointsAccountDocRef,
            'pointsBalance',
            FieldValue.increment(pointsDiff)
          );
        }
      });
    } catch (e) {
      console.error(e);
    }
  });
};

applyRetroactivePoints();
