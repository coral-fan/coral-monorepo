import md5 from 'md5';

export const getReferralCode = (userId: string, collectionId: string) =>
  md5(`${userId}${collectionId}`);
