import { Story, Meta } from '@storybook/react';
import { TwitterLink, TwitterLinkProp } from './TwitterLink';

export default {
  title: 'Coral/UI/Social Links/Twitter',
  component: TwitterLink,
} as Meta;

const Template: Story<TwitterLinkProp> = ({ ...args }) => <TwitterLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  twitterUsername: 'si_bonobo',
};
