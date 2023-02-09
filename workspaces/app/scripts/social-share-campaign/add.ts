import { getCollectionReferenceServerSide } from 'libraries/firebase';

import { SocialShareCampaignData } from 'libraries/models';

const NEW_LINE_CHARS = '/n/n';

const getDefaultContentString = (defaultContent: string[]) =>
  defaultContent.join(NEW_LINE_CHARS).concat(NEW_LINE_CHARS);

const socialShareCampaigns: SocialShareCampaignData[] = [
  {
    name: 'Tayla Parx All Access Pass NFT Social Share Campaign',
    description: 'Tayla Parx All Access Pass NFT social share campaign',
    shareUrl: 'N/A',
    pointsValue: 150,
    totalPointsPool: 3000,
    totalPointsEarned: 0,
    startDate: '2023-2-09T00:00:00.000Z',
    endDate: '2024-2-09T00:00:00.000Z',
    isActive: true,
    createdBy: 'tayla-parx',
    socials: ['twitter'],
    requiredContent: {
      urls: [],
      usernames: ['TAYLAPARX', 'coral__fan'],
      topics: [],
    },
    defaultContent: getDefaultContentString([
      'Claim your free @TAYLAPARX All Access Pass from @coral__fan now and get an exclusive view of the music video for the single “Rich” along with other holder perks.',
    ]),
    whitelistId: 'test-whitelist',
  },
];

const addSocialShareCampaign = async (socialShareCampaign: SocialShareCampaignData) => {
  console.log('Adding social share campaign...');
  const socialShareCollection = await getCollectionReferenceServerSide('social-share-campaigns');

  const res = await socialShareCollection.add(socialShareCampaign);

  console.log('Added social-share-campaign with ID: ', res.id);
};

socialShareCampaigns.forEach(addSocialShareCampaign);
