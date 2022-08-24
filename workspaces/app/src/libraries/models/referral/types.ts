import { Artist } from '../artist';
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

export interface ReferralTransactionMetadata {
  collectionId: Collection['id'];
  purchaseId: string;
}
export interface EarnedPointsData {
  referralTransactionId: ReferralTransactionId;
  referralCode: ReferralCode;
  pointsEarned: PointValue;
  timestamp: Timestamp;
}

export interface RedemptionData {
  pointsRedeemed: PointValue;
  redemptionId: RedemptionTransactionId;
  timestamp: Timestamp;
  toAddress: Address;
}

export interface ReferralCampaignData {
  name: string;
  description: string;
  createdBy: Artist['id'];
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
  collectionId: Collection['id'];
}

export interface ReferralTransactionData {
  campaignId: CampaignId;
  pointsEarned: PointValue;
  referralSource: string;
  referralCode: ReferralCode;
  timestamp: Timestamp;
  userId: User['id'];
  metadata: ReferralTransactionMetadata;
}

// EarnedPointData & RedemptionData stored
// as SubCollection
export interface UserReferralAccount {
  pointsBalance: PointValue;
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
