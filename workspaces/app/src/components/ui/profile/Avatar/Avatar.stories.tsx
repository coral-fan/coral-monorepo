import { Story, Meta } from '@storybook/react';
import { Avatar, AvatarProps } from './Avatar';
import { DEFAULT_PROFILE_PHOTO } from './consts';

export default {
  title: 'Coral/UI/Profile/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = ({ ...args }) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 50,
  ...DEFAULT_PROFILE_PHOTO,
};
