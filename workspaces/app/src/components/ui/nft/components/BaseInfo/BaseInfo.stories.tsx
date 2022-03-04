import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BaseInfo } from './BaseInfo';
import { BASE_INFO_DEFAULT_ARGS } from './consts';

export default {
  title: 'Coral/UI/NFT/Components/Info Base',
  component: BaseInfo,
  args: {},
} as ComponentMeta<typeof BaseInfo>;

const Template: ComponentStory<typeof BaseInfo> = (args) => <BaseInfo {...args} />;

export const Default = Template.bind({});

Default.args = BASE_INFO_DEFAULT_ARGS;
