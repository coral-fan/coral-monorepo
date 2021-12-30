import { Story, Meta } from '@storybook/react';
import { NavLink, NavLinkProps } from './NavLink';

export default {
  title: 'Coral/Navigation Link',
  component: NavLink,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<NavLinkProps> = ({ children, ...args }) => (
  <NavLink {...args}>{children}</NavLink>
);

export const Default = Template.bind({});
Default.args = {
  href: 'https://google.com',
  children: 'Text Link',
};

export const NewTab = Template.bind({});
NewTab.args = {
  href: 'https://google.com',
  children: 'Text Link (Opens New Tab)',
  target: '_blank',
};
