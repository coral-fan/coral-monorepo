import { Story, Meta } from '@storybook/react';
import { Link as NextLink, BaseLinkProps } from './Link';

export default {
  title: 'Coral/UI/Link',
  component: NextLink,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<BaseLinkProps> = ({ children, ...args }) => (
  <NextLink {...args}>{children}</NextLink>
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
