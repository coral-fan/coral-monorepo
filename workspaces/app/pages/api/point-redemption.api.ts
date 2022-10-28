import { Handler } from './types';
import { z } from 'zod';
import { ERROR_RESPONSE } from './consts';
import { getHandler, getRelaySigner } from './utils';
import {
  getBatch,
  getCollectionReferenceServerSide,
  getDocumentData,
  getDocumentReferenceServerSide,
} from 'libraries/firebase';
import { getUidServerSide, UserPointsAccount } from 'libraries/models';
import { validateAddress } from 'libraries/utils';
import { POINTS_AVAX_VALUE } from 'consts';
import { ethers } from 'ethers';

const PointRedemptionRequestBody = z.object({
  address: z.string().refine((addr) => validateAddress(addr)),
});

const post: Handler = async (req, res) => {
  let userPointAccountsRef;

  try {
    const { address } = PointRedemptionRequestBody.parse(req.body);

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

    /*
    Send crypto to provided address from Relayer
    */
    // Convert points to AVAX
    const avaxBalance = pointsBalance / POINTS_AVAX_VALUE;

    // Create transaction request
    const transactionRequest = {
      to: address,
      value: ethers.utils.parseUnits(avaxBalance.toString(), 'ether'),
    };

    // Get relay signer from Defender
    const signer = await getRelaySigner();

    // Send transaction
    const txn = await signer.sendTransaction(transactionRequest);
    const { hash: transactionHash } = txn;

    // Wait 3 blocks for confirmation, and confirm success
    const txnReceipt = await txn.wait(3);

    if (txnReceipt.status !== 1) {
      throw new Error(`Transaction ${transactionHash} reverted`);
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

    const referralRedemptionTransactionData = {
      pointsRedeemed: pointsBalance,
      avaxValue: avaxBalance,
      timestamp: new Date().toISOString(),
      toAddress: address,
      userId: uid,
      status: 'completed',
      transactionHash,
    };

    const batch = await getBatch();

    // Create point-redemption-transactions document
    batch.set(referralRedemptionTransactionsRef, referralRedemptionTransactionData);
    batch.set(userPointsRedeemedTransactionsRef, {
      pointsRedeemed: pointsBalance,
      timestamp: new Date().toISOString(),
      toAddress: address,
      transactionHash,
    });
    batch.set(userPointAccountsRef, { pointsBalance: 0 });

    await batch.commit();

    // Set isRedeeming to false
    await userPointAccountsRef.update({
      isRedeeming: false,
    });

    return res.status(200).json({ transactionHash });
  } catch (e) {
    // Reset isRedeeming in case of error
    await userPointAccountsRef?.update({ isRedeeming: false });
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
