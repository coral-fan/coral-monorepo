import { Story, Meta } from '@storybook/react';
import { DoorBadge } from './DoorBadge';
import { BadgeProps } from 'components/ui/Badge/types';

export default {
  title: 'Coral/Badges/Door Badge',
  component: DoorBadge,
  argTypes: {
    size: {
      options: ['S', 'M', 'L', 'XL'],
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
  size: 'L',
  variant: 'primary',
};
