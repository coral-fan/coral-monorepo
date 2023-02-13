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
    pointsValue: 20,
    totalPointsPool: 3500,
    totalPointsEarned: 0,
    startDate: '2023-02-12T00:00:00.000Z',
    endDate: '2024-02-12T00:00:00.000Z',
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
  {
    name: "Tayla Parx For What It's Worth On Spotify Social Share Campaign",
    description: "Tayla Parx For What It's Worth on Spotify social share campaign",
    shareUrl: 'N/A',
    pointsValue: 20,
    totalPointsPool: 3500,
    totalPointsEarned: 0,
    startDate: '2023-02-12T00:00:00.000Z',
    endDate: '2024-02-12T00:00:00.000Z',
    isActive: true,
    createdBy: 'tayla-parx',
    socials: ['twitter'],
    requiredContent: {
      urls: [],
      usernames: ['TAYLAPARX', 'coral__fan'],
      topics: [],
    },
    defaultContent: getDefaultContentString([
      `Go stream @TAYLAPARX new single “For What It's Worth” now on Spotify.`,
      "I'm supporting Tayla via @coral__fan.",
    ]),
    whitelistId: 'test-whitelist',
  },
];

const addSocialShareCampaign = async () => {
  for (const data of socialShareCampaigns) {
    console.log('Adding social share campaign...');
    const socialShareCollection = await getCollectionReferenceServerSide('social-share-campaigns');

    const res = await socialShareCollection.add(data);

    console.log('Added social-share-campaign with ID: ', res.id);
  }
};

addSocialShareCampaign();
