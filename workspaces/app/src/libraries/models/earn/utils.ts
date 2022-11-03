import md5 from 'md5';

export const getEarnCode = (userId: string, campaignId: string) => md5(`${userId}${campaignId}`);
