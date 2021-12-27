import { Story, Meta } from '@storybook/react';
import { VideoBadge } from './VideoBadge';
import { BadgeProps } from 'components/ui/Badge/types';

export default {
  title: 'Coral/Badges/Video Badge',
  component: VideoBadge,
  argTypes: {
    size: {
      options: ['extraSmall', 'small', 'medium', 'large', 'extraLarge'],
      control: { type: 'select' },
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<BadgeProps> = (args) => <VideoBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'large',
  variant: 'primary',
};
