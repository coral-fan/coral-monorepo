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

Default.args = {
  ...BASE_INFO_DEFAULT_ARGS,
  nameHeadingLevel: 3,
  Badge: EventBadge,
  dropDateTimestamp: new Date().getTime(),
};
