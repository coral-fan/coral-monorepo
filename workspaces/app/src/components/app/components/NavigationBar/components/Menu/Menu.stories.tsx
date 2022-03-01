import { Story, Meta } from '@storybook/react';
import { MenuProp } from '.';
import { Menu } from './Menu';

export default {
  title: 'Coral/App/Navigation Bar/Menu',
  component: Menu,
  argTypes: {
    notificationsCount: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<MenuProp> = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  isAuthenticated: true,
  // notificationsCount: 1,
  walletBalance: 0,
  username: 'User123',
  profilePhoto: {
    src: 'https://www.stereofox.com/images/86513/resized.jpg',
    offsetPercentages: [0, 0],
    scale: 1,
  },
};

export const Unauthenticated = Template.bind({});
Unauthenticated.args = {
  isAuthenticated: false,
};
