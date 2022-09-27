import md5 from 'md5';

export const getReferralCode = (userId: string, campaignId: string) =>
  md5(`${userId}${campaignId}`);
