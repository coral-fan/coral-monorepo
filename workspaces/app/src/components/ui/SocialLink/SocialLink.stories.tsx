import { Story, Meta } from '@storybook/react';
import { SocialLink, SocialLinkProps } from './SocialLink';

export default {
  title: 'Coral/UI/Social Links',
  component: SocialLink,
} as Meta;

const Template: Story<SocialLinkProps> = (args) => <SocialLink {...args} />;

export const Twitter = Template.bind({});
Twitter.args = {
  socialType: 'twitter',
  username: 'si_bonobo',
};

export const Instagram = Template.bind({});
Instagram.args = {
  socialType: 'instagram',
  username: 'si_bonobo',
};

export const Facebook = Template.bind({});
Facebook.args = {
  socialType: 'facebook',
  username: 'bonoboofficial',
};
