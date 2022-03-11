import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NftAsset } from './NftAsset';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from '../../../../ui/nft/components/ImageWithInfo/consts';
import { DEFAULT_PROFILE_PHOTO } from '../../../../ui/profile/Avatar/consts';
export default {
  title: 'Coral/Pages/Asset/NFT Asset',
  component: NftAsset,
  args: {},
} as ComponentMeta<typeof NftAsset>;

const Template: ComponentStory<typeof NftAsset> = (args) => <NftAsset {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 1,
  type: 'event',
  collectionName: 'Behind the Scenes Studio Tour',
  collectionDescription:
    'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
  collectionDetails: [
    'A personal call between just you and Bonobo',
    'Available any time before March 1st, 2022',
    "Accessible by Zoom after you've torn the ticket",
  ],
  ownerUsername: 'User123',
  ownerType: 'super_fan',
  ownerProfilePhoto: DEFAULT_PROFILE_PHOTO,
  ...IMAGE_WITH_INFO_DEFAULT_ARGS,
};
