import { Story, Meta } from '@storybook/react';
import { BaseLink, BaseLinkProps } from './BaseLink';

export default {
  title: 'Coral/UI/Base Link',
  component: BaseLink,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<BaseLinkProps> = ({ children, ...args }) => (
  <BaseLink {...args}>{children}</BaseLink>
);

export const Default = Template.bind({});
Default.args = {
  href: 'https://google.com',
  children: 'Text Link',
};

export const DefaultNewTab = Template.bind({});
DefaultNewTab.args = {
  href: 'https://google.com',
  children: 'Text Link (Opens New Tab)',
  target: '_blank',
};
