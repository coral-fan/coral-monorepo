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
  UserPointsAccount,
} from 'libraries/models';
import { getTimeInsideWindow } from 'libraries/time';
import { FieldValue } from 'firebase-admin/firestore';

interface ReferralTransaction {
  referralCode: string;
  referralSource: string;
  purchaseId: string;
}

export const commitReferralTransaction = async ({
  referralCode,
  referralSource,
  purchaseId,
}: ReferralTransaction) => {
  try {
    // Get referral document
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
    const userPointsAccountDocumentData = await getDocumentData<UserPointsAccount>(
      'user-points-accounts',
      userId
    );

    if (!userPointsAccountDocumentData) {
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
    const userPointsAccountRef = await getDocumentReferenceServerSide(
      'user-points-accounts',
      userId
    );

    // Get reference to user-referral-account subcollection
    const userPointsEarnedTransactionsRef = await getDocumentReferenceServerSide(
      `user-points-accounts/${userId}/pointsEarnedTransactions`,
      referralTransactionId
    );

    // Get reference to referral-campaign
    const referralCampaignsRef = await getDocumentReferenceServerSide(
      'referral-campaigns',
      campaignId
    );

    // Ensure potential new total doesn't exceed total points pool
    if (pointsValue + totalPointsEarned > totalPointsPool) {
      throw new Error('Campaign max points already awarded');
    }

    // Get reference to referral for conversion tracking
    const referralRef = await getDocumentReferenceServerSide('referrals', referralCode);

    // Create batch firestore transaction
    const batch = await getBatch();

    // Create referral-transaction document
    batch.set(referralTransactionsRef, referralTransactionData);

    // Update referral-campaigns campaign document with total points earned
    batch.update(referralCampaignsRef, 'totalPointsEarned', FieldValue.increment(pointsValue));

    // Update user-points-accounts document
    batch.update(userPointsAccountRef, 'pointsBalance', FieldValue.increment(pointsValue));

    // Update conversions-tracking on referrals
    batch.update(referralRef, 'conversions', FieldValue.increment(1));

    // Create user-points-accounts pointsEarned subcollection
    batch.set(userPointsEarnedTransactionsRef, {
      referralCode,
      pointsEarned: pointsValue,
      timestamp: referralTransactionData.timestamp,
    });

    await batch.commit();

    return referralTransactionId;
  } catch (e) {
    console.error(e);
  }
};
