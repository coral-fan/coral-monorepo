import { Story, Meta } from '@storybook/react';
import { Avatar } from './Avatar';
import { AvatarProps } from './types';

export default {
  title: 'Coral/UI/User/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<AvatarProps> = ({ ...args }) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: './defaultAvatar.png',
  size: 'xxl',
  showBorder: false,
};
