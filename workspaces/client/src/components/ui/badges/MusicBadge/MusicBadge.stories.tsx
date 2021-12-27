import { Story, Meta } from '@storybook/react';
import { MusicBadge } from './MusicBadge';
import { BadgeProps } from 'components/ui/Badge/types';

export default {
  title: 'Coral/Badges/Music Badge',
  component: MusicBadge,
  argTypes: {
    size: {
      options: ['xtraSmall', 'small', 'medium', 'large', 'xtraLarge'],
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
  size: 'large',
  variant: 'primary',
};
