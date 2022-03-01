import { Story, Meta } from '@storybook/react';
import { Avatar, AvatarProps } from './Avatar';

export default {
  title: 'Coral/UI/Profile/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = ({ ...args }) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 130,
  hasBorder: false,
};

export const WithPhoto = Template.bind({});
WithPhoto.args = {
  src: 'https://www.stereofox.com/images/86513/resized.jpg',
  size: 130,
  hasBorder: false,
};
