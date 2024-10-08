import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BaseInfo } from './BaseInfo';
import { BASE_INFO_DEFAULT_ARGS } from './consts';
import { EventBadge } from '../../../badges';

export default {
  title: 'Coral/UI/NFT/Components/Base Info',
  component: BaseInfo,
  args: {},
} as ComponentMeta<typeof BaseInfo>;

const Template: ComponentStory<typeof BaseInfo> = (args) => <BaseInfo {...args} />;

export const Default = Template.bind({});

Default.args = BASE_INFO_DEFAULT_ARGS;

export const withBadge = Template.bind({});

withBadge.args = {
  ...BASE_INFO_DEFAULT_ARGS,
  Badge: EventBadge,
};

export const withDescription = Template.bind({});

withDescription.args = {
  ...BASE_INFO_DEFAULT_ARGS,
  description:
    'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
};
