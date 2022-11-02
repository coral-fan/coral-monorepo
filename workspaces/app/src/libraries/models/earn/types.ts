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
type Url = string;
type Username = string;
type Topic = string;

type RedemptionStatus = 'pending' | 'completed' | 'failed';
type SocialPlatform = 'twitter' | 'instagram' | 'facebook' | 'tiktok';

type SocialShareId = string;

export interface RequiredContent {
  urls: Url[];
  usernames: Username[];
  topics: Topic[];
}
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

export interface SocialUsersWithVerifiedSharesData {
  socialShareId: SocialShareId;
  hasVerifiedShare: boolean;
}

/*
  CAMPAIGN DATA
*/
interface BaseCampaignData {
  name: string;
  description: string;
  createdBy: Artist['id'];
  pointsValue: PointValue;
  totalPointsPool: PointValue;
  totalPointsEarned: PointValue;
  startDate: Timestamp;
  endDate: Timestamp;
  isActive: boolean;
}
export interface ReferralCampaignData extends BaseCampaignData {
  baseReferralUrl: string;
}
export interface SocialShareCampaignData extends BaseCampaignData {
  shareUrl: string;
  socials: SocialPlatform[];
  requiredContent: RequiredContent;
}

/*
  REFERRAL/SHARE DATA
*/
interface BaseEarnData {
  campaignId: CampaignId;
  createdAt: Timestamp;
  userId: User['id'];
}
export interface ReferralData extends BaseEarnData {
  collectionId: Collection['id'];
  seenFingerprints: string[];
  visits: number;
  uniqueVisits: number;
  conversions: number;
}

export interface SocialShareData extends BaseEarnData {
  sharedSocials: Record<SocialPlatform, boolean>[];
}

/*
  TRANSACTION DATA
*/
interface BaseTransactionData {
  campaignId: CampaignId;
  pointsEarned: PointValue;
  timestamp: Timestamp;
  userId: User['id'];
}

export interface ReferralTransactionData extends BaseTransactionData {
  referralCode: ReferralCode;
  referralSource: string;
  metadata: ReferralTransactionMetadata;
}

export interface SocialShareTransactionData extends BaseTransactionData {
  socialShareId: SocialShareId;
  social: SocialPlatform;
}

export interface UserPointsAccount {
  pointsBalance: PointValue;
  isRedeeming: boolean;
}

export interface RedemptionData {
  pointsRedeemed: PointValue;
  redemptionId: RedemptionTransactionId;
  timestamp: Timestamp;
  toAddress: Address;
  transactionHash: string;
}
export interface PointRedemptionTransactionData {
  pointsRedeemed: PointValue;
  status: RedemptionStatus;
  timestamp: Timestamp;
  toAddress: Address;
  transactionHash: string;
  userId: User['id'];
}
