import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DropCard } from './DropCard';

export default {
  title: 'Coral/UI/NFT/DropCard',
  component: DropCard,
  args: {},
} as ComponentMeta<typeof DropCard>;

const Template: ComponentStory<typeof DropCard> = (args) => <DropCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
