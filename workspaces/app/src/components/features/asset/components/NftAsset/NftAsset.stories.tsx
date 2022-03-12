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

const BASE_NFT_ASSET_ARGS = {
  id: 1,
  ownerUsername: 'User123',
  ownerAddress: '0x123456789',
  ownerType: 'super_fan',
  ownerProfilePhoto: DEFAULT_PROFILE_PHOTO,
  ...IMAGE_WITH_INFO_DEFAULT_ARGS,
};

export const Event = Template.bind({});

Event.args = {
  ...BASE_NFT_ASSET_ARGS,
  type: 'event',
  gatedContent: {
    type: 'event',
    id: '0x123456789',
  },
  collectionName: 'Behind the Scenes Studio Tour',
  collectionDescription:
    'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
};

export const Music = Template.bind({});

Music.args = {
  ...BASE_NFT_ASSET_ARGS,
  type: 'music',
  gatedContent: {
    type: 'url',
    url: '/',
  },
  collectionName: 'Unreleased Album',
  collectionDescription: 'Exclusive digital download of Unreleased Album',
};
