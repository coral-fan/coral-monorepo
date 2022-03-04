import { ComponentMeta, ComponentStory } from '@storybook/react';
import { VideoBadge } from '../../../badges';

import { InfoBase } from './InfoBase';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from '../ImageWithInfo/consts';

export default {
  title: 'Coral/UI/NFT/Components/Info Base',
  component: InfoBase,
  args: {},
} as ComponentMeta<typeof InfoBase>;

const Template: ComponentStory<typeof InfoBase> = (args) => <InfoBase {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: 'Behind the Scenes Studio Tour',
  Badge: VideoBadge,
  description:
    'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
  ...IMAGE_WITH_INFO_DEFAULT_ARGS,
};
