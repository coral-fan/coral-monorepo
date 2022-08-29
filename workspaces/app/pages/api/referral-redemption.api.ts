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
import {
  PurchaseData,
  ReferralCampaignData,
  ReferralData,
  ReferralTransactionData,
  UserReferralAccount,
} from 'libraries/models';
import { FieldValue } from 'firebase-admin/firestore';
import { validateAddress } from 'libraries/utils';
import { POINTS_AVAX_VALUE } from 'consts';
import { ethers } from 'ethers';

const ReferralRedemptionRequestBody = z.object({
  uid: z.string(),
  address: z.string().refine((addr) => validateAddress(addr)),
  points: z.number(),
});

const post: Handler = async (req, res) => {
  console.log('Request received...');
  try {
    const { uid, address, points } = ReferralRedemptionRequestBody.parse(req.body);

    // Get user document
    const userReferralAccountDocumentData = await getDocumentData<UserReferralAccount>(
      'user-referral-accounts',
      uid
    );

    if (!userReferralAccountDocumentData) {
      throw new Error(`User ${uid} does not have a user referral account`);
    }

    // Validate redemption is not already in process
    if (userReferralAccountDocumentData.isRedeeming) {
      throw new Error(`User ${uid} has already requested a redemption`);
    }

    // Get reference to user-referral-account
    const userReferralAccountsRef = await getDocumentReferenceServerSide(
      'user-referral-accounts',
      uid
    );

    // Set isRedeeming to true
    await userReferralAccountsRef.update({
      isRedeeming: true,
    });

    // Validate points balance
    const { pointsBalance } = userReferralAccountDocumentData;

    if (points > pointsBalance) {
      throw new Error(
        `User has insufficient points balance for request: ${points} requested, points balance only ${pointsBalance}`
      );
    }

    /*
    Send crypto to provided address from Relayer
    */
    // Convert points to AVAX
    const avaxBalance = points / POINTS_AVAX_VALUE;

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

    // Wait 1 block for confirmation, and confirm success
    const txnReceipt = await txn.wait(1);

    if (txnReceipt.status !== 1) {
      throw new Error(`Transaction ${transactionHash} reverted`);
    }

    // Create reference to referral-redemption-transactons collection
    const referralRedemptionTransactionsRef = (
      await getCollectionReferenceServerSide('referral-redemption-transactions')
    ).doc();

    // Get reference to user-referral-account subcollection
    const userPointsRedeemedTransactionsRef = await getDocumentReferenceServerSide(
      `user-referral-accounts/${uid}/pointsRedeemedTransactions`,
      referralRedemptionTransactionsRef.id
    );

    const referralRedemptionTransactionData = {
      pointsRedeemed: points,
      avaxValue: avaxBalance,
      timestamp: new Date().toISOString(),
      toAddress: address,
      userId: uid,
      status: 'completed',
      transactionHash,
    };

    const batch = await getBatch();

    // Create referral-redemption-transactions document
    batch.set(referralRedemptionTransactionsRef, referralRedemptionTransactionData);
    batch.set(userPointsRedeemedTransactionsRef, {
      pointsRedeemed: points,
      timestamp: new Date().toISOString(),
      toAddress: address,
    });
    batch.set(userReferralAccountsRef, { pointsBalance: 0 });

    await batch.commit();
    // Set isRedeeming to false
    await userReferralAccountsRef.update({
      isRedeeming: false,
    });

    return res.status(200).json({ transactionHash });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
