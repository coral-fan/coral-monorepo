import { Handler } from './types';
import { z } from 'zod';
import { ERROR_RESPONSE } from './consts';
import { getHandler } from './utils';
import { getBatch, getCollectionReferenceServerSide, getDocumentData } from 'libraries/firebase';
import {
  PurchaseData,
  ReferralCampaignData,
  ReferralData,
  ReferralTransactionData,
  UserReferralAccount,
} from 'libraries/models';
import { getTimeInsideWindow } from 'libraries/time';
import { FieldValue } from 'firebase-admin/firestore';

const RecordTransactionRequestBody = z.object({
  referralCode: z.string(),
  referralSource: z.string(),
  purchaseId: z.string(),
});

const post: Handler = async (req, res) => {
  try {
    const { referralCode, referralSource, purchaseId } = RecordTransactionRequestBody.parse(
      req.body
    );

    // Geet referral document
    const referralDocumentData = await getDocumentData<ReferralData>('referrals', referralCode);

    if (!referralDocumentData) {
      throw new Error(`Referral code ${referralCode} isn't in database.`);
    }

    const { campaignId, userId, collectionId } = referralDocumentData;

    // Get campaign document
    const referralCampaignDocumentData = await getDocumentData<ReferralCampaignData>(
      'referral-campaigns',
      campaignId
    );

    if (!referralCampaignDocumentData) {
      throw new Error(`Referral campaign ${campaignId} isn't in database.`);
    }

    const { pointsValue, name, isActive, startDate, endDate, totalPointsEarned, totalPointsPool } =
      referralCampaignDocumentData;

    // Confirm that purchaseId is valid
    const purchasesDocumentData = await getDocumentData<PurchaseData>('purchases', purchaseId);

    if (!purchasesDocumentData) {
      throw new Error(`Purchase ${purchaseId} isn't in database.`);
    }

    // Ensure campaign is active
    if (!isActive) {
      throw new Error(`The ${name} campaign (${campaignId}) is not currently active`);
    }

    // Ensure event is in between startDate and endDate
    const isInsideTimeWindow = getTimeInsideWindow(startDate, endDate);
    if (!isInsideTimeWindow) {
      throw new Error(`The ${name} campaign (${campaignId}) has not started yet or is over`);
    }

    // Get user referral accounts document
    const userReferralAccountDocumentData = await getDocumentData<UserReferralAccount>(
      'user-referral-accounts',
      userId
    );

    if (!userReferralAccountDocumentData) {
      throw new Error(`User ${userId} does not have a user referral account`);
    }

    // referral-transactions data
    const referralTransactionData: ReferralTransactionData = {
      campaignId,
      pointsEarned: pointsValue,
      referralSource,
      referralCode,
      timestamp: new Date().toISOString(),
      userId,
      metadata: {
        collectionId,
        purchaseId,
      },
    };

    // Create reference to referral-transaction
    const referralTransactionsRef = (
      await getCollectionReferenceServerSide('referral-transactions')
    ).doc();

    // Get referralTransactionId
    const referralTransactionId = referralTransactionsRef.id;

    // Get reference to user-referral-account
    const userReferralAccountsRef = (
      await getCollectionReferenceServerSide('user-referral-accounts')
    ).doc(userId);

    // Get reference to user-referral-account subcollection
    const userPointsEarnedTransactionsRef = (
      await getCollectionReferenceServerSide(
        `user-referral-accounts/${userId}/pointsEarnedTransactions`
      )
    ).doc(referralTransactionId);

    // Get reference to referral-campaign
    const referralCampaignsRef = (await getCollectionReferenceServerSide('referral-campaigns')).doc(
      campaignId
    );

    // Ensure potential new total doesn't exceed total points pool
    if (pointsValue + totalPointsEarned > totalPointsPool) {
      throw new Error('Campaign max points already awarded');
    }

    // Create batch firestore transaction
    const batch = await getBatch();

    // Create referral-transaction document
    batch.set(referralTransactionsRef, referralTransactionData);

    // Update referral-campaigns campaign document with total points earned
    batch.update(referralCampaignsRef, 'totalPointsEarned', FieldValue.increment(pointsValue));

    // Update user-referral-accounts document
    batch.update(userReferralAccountsRef, 'pointsBalance', FieldValue.increment(pointsValue));

    // Create user-referral-accounts pointsEarned subcollection
    batch.set(userPointsEarnedTransactionsRef, {
      referralTransactionId,
      referralCode,
      pointsEarned: pointsValue,
      timestamp: referralTransactionData.timestamp,
    });

    await batch.commit();

    return res.status(200).json({ referralTransactionId });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
