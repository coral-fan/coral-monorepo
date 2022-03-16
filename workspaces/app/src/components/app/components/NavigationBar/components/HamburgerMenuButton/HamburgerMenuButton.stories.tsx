import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HamburgerMenuButton } from './HamburgerMenuButton';

export default {
  title: 'Coral/App/Navigation Bar/Hamburger Icon Button',
  component: HamburgerMenuButton,
} as ComponentMeta<typeof HamburgerMenuButton>;

const Template: ComponentStory<typeof HamburgerMenuButton> = () => <HamburgerMenuButton />;

export const Default = Template.bind({});

Default.args = {
  hasNotifications: true,
};
