import { Story, Meta } from '@storybook/react';
import { MenuProp } from '.';
import { Menu } from './Menu';

export default {
  title: 'Coral/Navigation Bar/Menu',
  component: Menu,
  argTypes: {
    notificationsCount: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<MenuProp> = ({ notificationsCount }) => (
  <Menu notificationsCount={notificationsCount} />
);

export const Default = Template.bind({});

Default.args = {
  notificationsCount: 1,
};
