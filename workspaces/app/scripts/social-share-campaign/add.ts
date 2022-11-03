import { getCollectionReferenceServerSide } from 'libraries/firebase';

import { SocialShareCampaignData } from 'libraries/models';

const socialShareCampaign: SocialShareCampaignData = {
  name: 'Test Social Share Campaign',
  description: 'Test social share description',
  shareUrl: 'https://coral.fan/test/',
  pointsValue: 10,
  totalPointsPool: 1000,
  totalPointsEarned: 0,
  startDate: '2022-11-03T12:00:00.000Z',
  endDate: '2022-12-31T17:00:00.000Z',
  isActive: true,
  createdBy: '0xA34D4367Bd647B996b1e2A790073e9022fa73De8',
  socials: ['twitter'],
  requiredContent: {
    urls: ['https://coral.fan/share-this-url'],
    usernames: ['@coral__fan'],
    topics: ['#coral'],
  },
  defaultContent: 'Test video wow',
};

const addSocialShareCampaign = async () => {
  console.log('Adding social share campaign...');
  const socialShareCollection = await getCollectionReferenceServerSide('social-share-campaigns');

  const res = await socialShareCollection.add(socialShareCampaign);

  console.log('Added social-share-campaign with ID: ', res.id);
  console.log('Updating collection... \n');
};

addSocialShareCampaign();
