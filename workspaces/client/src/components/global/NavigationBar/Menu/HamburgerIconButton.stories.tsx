import { Story, Meta } from '@storybook/react';
import { HamburgerIconButton, HamburgerIconButtonProps } from './HamburgerIconButton';

export default {
  title: 'Coral/Navigation Bar/Hamburger Icon Button',
  component: HamburgerIconButton,
} as Meta;

const Template: Story<HamburgerIconButtonProps> = ({ hasNotifications }) => (
  <HamburgerIconButton hasNotifications={hasNotifications} />
);

export const Default = Template.bind({});

Default.args = {
  hasNotifications: true,
};
