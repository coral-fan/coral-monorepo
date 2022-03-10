import { Story, Meta } from '@storybook/react';
import { InstagramLink, InstagramLinkProp } from './InstagramLink';

export default {
  title: 'Coral/UI/Social Links/Instagram',
  component: InstagramLink,
} as Meta;

const Template: Story<InstagramLinkProp> = ({ ...args }) => <InstagramLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  instagramUsername: 'si_bonobo',
};
