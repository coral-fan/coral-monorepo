import { Story, Meta } from '@storybook/react';
import { MusicBadge } from './MusicBadge';
import { BadgeProps } from 'components/ui/badges/types';

export default {
  title: 'Coral/UI/Badges/Music Badge',
  component: MusicBadge,
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

const Template: Story<BadgeProps> = (args) => <MusicBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  variant: 'primary',
};
