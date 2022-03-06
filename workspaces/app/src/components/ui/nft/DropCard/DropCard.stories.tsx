import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EventBadge } from '../../badges';
import { BASE_INFO_DEFAULT_ARGS } from '../components/BaseInfo/consts';
import { DropCard } from './DropCard';

export default {
  title: 'Coral/UI/NFT/DropCard',
  component: DropCard,
  args: {},
} as ComponentMeta<typeof DropCard>;

const Template: ComponentStory<typeof DropCard> = (args) => <DropCard {...args} />;

export const Default = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- using destructuring to remove property without mutating object
const { nameHeadingLevel, ...baseDefaultArgs } = BASE_INFO_DEFAULT_ARGS;

Default.args = {
  ...baseDefaultArgs,
  Badge: EventBadge,
  dropDateTimestamp: new Date().getTime(),
};
