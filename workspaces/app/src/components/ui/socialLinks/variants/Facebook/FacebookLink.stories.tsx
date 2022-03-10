import { Story, Meta } from '@storybook/react';
import { FacebookLink, FacebookLinkProp } from './FacebookLink';

export default {
  title: 'Coral/UI/Social Links/facebook',
  component: FacebookLink,
} as Meta;

const Template: Story<FacebookLinkProp> = ({ ...args }) => <FacebookLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  facebookUsername: 'bonoboofficial',
};
