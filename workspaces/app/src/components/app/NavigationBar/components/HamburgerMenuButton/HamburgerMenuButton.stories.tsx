import { Story, Meta } from '@storybook/react';
import { HamburgerMenuButton, HamburgerMenuButtonProps } from './HamburgerMenuButton';

export default {
  title: 'Coral/App/Navigation Bar/Hamburger Icon Button',
  component: HamburgerMenuButton,
} as Meta;

const Template: Story<HamburgerMenuButtonProps> = ({ hasNotifications }) => (
  <HamburgerMenuButton hasNotifications={hasNotifications} />
);

export const Default = Template.bind({});

Default.args = {
  hasNotifications: true,
};
