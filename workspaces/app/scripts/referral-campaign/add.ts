import { getCollectionReferenceServerSide } from 'libraries/firebase';

import { ReferralCampaignData } from 'libraries/models';

const referralCampaign: ReferralCampaignData = {
  name: 'Test Referral Campaign',
  description: 'Test referral description',
  baseReferralUrl: 'https://coral.fan/test/',
  pointsValue: 10,
  totalPointsPool: 1000,
  totalPointsEarned: 0,
  startDate: '2022-06-17T17:00:00.000Z',
  endDate: '2022-06-17T17:00:00.000Z',
  isActive: true,
  createdBy: '0xCa86C97A5f5D8906DAeF4Bc83Ad9665D5298d35B',
};

const addReferralCampaign = async () => {
  console.log('Adding referral campaign...');

  const referralCollection = await getCollectionReferenceServerSide('referral-campaigns');

  const res = await referralCollection.add(referralCampaign);

  console.log('Added referral-campaign with ID: ', res.id);
};

addReferralCampaign();
