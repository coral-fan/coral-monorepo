import { Story, Meta } from '@storybook/react';
import { DoorBadge } from './DoorBadge';
import { BadgeProps } from 'components/ui/badges/types';

export default {
  title: 'Coral/UI/Badges/Door Badge',
  component: DoorBadge,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<BadgeProps> = (args) => <DoorBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  variant: 'primary',
};
