import {
  getCollectionReferenceServerSide,
  getDocumentReferenceServerSide,
} from 'libraries/firebase';

import { CollectionData, ReferralCampaignData } from 'libraries/models';

const collectionId = '0xaA1c5956dcE213733377eAa8ae6D4f9Cf9f5d570';

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
  console.log('Updating collection... \n');
  if (collectionId) {
    const collectionRef = await getDocumentReferenceServerSide<CollectionData>(
      'collections',
      collectionId
    );

    const collectionDocSnapshot = await collectionRef.get();

    if (!collectionDocSnapshot.exists) {
      throw Error(`Collection with id ${collectionId} does not exist`);
    }

    await collectionRef.update({
      activeCampaign: res.id,
    });
  }
  console.log('Collection updated');
};

addReferralCampaign();
