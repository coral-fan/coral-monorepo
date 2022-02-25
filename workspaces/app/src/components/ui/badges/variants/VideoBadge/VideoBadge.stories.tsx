import { Story, Meta } from '@storybook/react';
import { VideoBadge } from './VideoBadge';
import { BadgeProps } from '../../BaseBadge';

export default {
  title: 'Coral/UI/Badges/Video Badge',
  component: VideoBadge,
} as Meta;

const Template: Story<BadgeProps> = () => <VideoBadge />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
