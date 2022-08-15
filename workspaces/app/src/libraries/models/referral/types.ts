import { Collection } from '../collection';
import { User } from '../user';

export * from './types';

type CampaignId = string;
type PointValue = number;
type Timestamp = string;
type ReferralCode = string;
type ReferralTransactionId = string;
type RedemptionTransactionId = string;
type Address = string;

type RedemptionStatus = 'pending' | 'completed' | 'failed';

interface ReferralTransactionMetadata {
  collectionId: Collection['id'];
  purchaseId?: string;
}

interface EarnedPointsData {
  referralTransactionId: ReferralTransactionId;
  referralCode: ReferralCode;
  pointsEarned: PointValue;
  timestamp: Timestamp;
}

interface RedemptionData {
  pointsRedeemed: PointValue;
  redemptionId: RedemptionTransactionId;
  timestamp: Timestamp;
  toAddress: Address;
}

export interface ReferralCampaignData {
  name: string;
  description: string;
  baseReferralUrl: string;
  pointsValue: PointValue;
  totalPointsPool: PointValue;
  totalPointsEarned: PointValue;
  startDate: Timestamp;
  endDate: Timestamp;
  isActive: boolean;
}

export interface ReferralData {
  campaignId: CampaignId;
  createdAt: Timestamp;
  userId: User['id'];
  collectionId?: Collection['id'];
}

export interface ReferralTransactionData {
  campaignId: CampaignId;
  pointsEarned: PointValue;
  referralCode: ReferralCode;
  timestamp: Timestamp;
  userId: User['id'];
  metadata?: ReferralTransactionMetadata;
}

export interface UserReferralAccount {
  pointsBalance: PointValue;
  earnedPointsTransactions: EarnedPointsData;
  redemptionTransactions: RedemptionData;
  isRedeeming: boolean;
}

export interface ReferralRedemptionTransactionData {
  pointsRedeemed: PointValue;
  status: RedemptionStatus;
  timestamp: Timestamp;
  toAddress: Address;
  transactionHash: string;
  userId: User['id'];
}
