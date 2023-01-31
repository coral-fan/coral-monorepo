import { Handler } from './types';
import { z } from 'zod';
import { ERROR_RESPONSE } from './consts';
import { getHandler } from './utils';
import {
  getBatch,
  getCollectionReferenceServerSide,
  getDocumentData,
  getDocumentReferenceServerSide,
} from 'libraries/firebase';
import { getUidServerSide, UserPointsAccount } from 'libraries/models';

const RedeemPointsRequestBody = z.object({
  rewardId: z.string(),
});

interface Reward {
  pointsCost: number;
}

const post: Handler = async (req, res) => {
  let userPointAccountsRef;

  try {
    const { rewardId } = RedeemPointsRequestBody.parse(req.body);

    // Get uid
    const uid = await getUidServerSide(req);

    // Get user document
    const userPointAccountDocumentData = await getDocumentData<UserPointsAccount>(
      'user-points-accounts',
      uid
    );

    if (!userPointAccountDocumentData) {
      throw new Error(`User ${uid} does not have a user referral account`);
    }

    // Validate redemption is not already in process
    if (userPointAccountDocumentData.isRedeeming) {
      throw new Error(`User ${uid} has already requested a redemption`);
    }

    // Get reference to user-referral-account
    userPointAccountsRef = await getDocumentReferenceServerSide('user-points-accounts', uid);

    // Set isRedeeming to true
    await userPointAccountsRef.update({
      isRedeeming: true,
    });

    const { pointsBalance } = userPointAccountDocumentData;

    const rewardDocRef = await getDocumentReferenceServerSide<Reward>('rewards', rewardId);

    const rewardDocSnapshot = await rewardDocRef.get();

    const rewardData = rewardDocSnapshot.data();

    if (rewardData === undefined) {
      throw new Error(`Reward with id ${rewardId} does not exist.`);
    }

    const { pointsCost } = rewardData;

    const updatedPointsBalance = pointsBalance - pointsCost;

    if (updatedPointsBalance < 0) {
      throw new Error(
        `User with id ${uid} does not have enough points (${pointsBalance}) to redeem reward (${rewardId}) with cost ${pointsCost}`
      );
    }

    // Create reference to point-redemption-transactons collection
    const referralRedemptionTransactionsRef = (
      await getCollectionReferenceServerSide('point-redemption-transactions')
    ).doc();

    // Get reference to user-referral-account subcollection
    const userPointsRedeemedTransactionsRef = await getDocumentReferenceServerSide(
      `user-points-accounts/${uid}/pointsRedeemedTransactions`,
      referralRedemptionTransactionsRef.id
    );

    const batch = await getBatch();

    // Create point-redemption-transactions document
    batch.set(referralRedemptionTransactionsRef, {
      pointsRedeemed: pointsCost,
      timestamp: new Date().toISOString(),
      userId: uid,
      status: 'completed',
      meta: {
        rewardId,
      },
    });

    batch.set(userPointsRedeemedTransactionsRef, {
      pointsRedeemed: pointsCost,
      timestamp: new Date().toISOString(),
      meta: {
        rewardId,
      },
    });

    batch.set(userPointAccountsRef, { pointsBalance: updatedPointsBalance });

    const usersDocRef = rewardDocRef.collection('participants').doc(uid);

    batch.set(usersDocRef, { isParticipating: true });

    await batch.commit();

    // Set isRedeeming to false
    await userPointAccountsRef.update({
      isRedeeming: false,
    });

    return res.status(200).send('');
  } catch (e) {
    // Reset isRedeeming in case of error
    await userPointAccountsRef?.update({ isRedeeming: false });
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
