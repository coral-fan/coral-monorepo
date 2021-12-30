import { Story, Meta } from '@storybook/react';
import { VideoBadge } from './VideoBadge';
import { BadgeProps } from 'components/ui/badges/types';

export default {
  title: 'Coral/UI/Badges/Video Badge',
  component: VideoBadge,
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

const Template: Story<BadgeProps> = (args) => <VideoBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  variant: 'primary',
};
