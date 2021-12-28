import { Story, Meta } from '@storybook/react';
import { ShareButton } from './ShareButton';

export default {
  title: 'Coral/Pages/Assets/Share Button',
  component: ShareButton,
} as Meta;

const Template: Story = (args) => <ShareButton {...args}>Share</ShareButton>;

export const Default = Template.bind({});

Default.args = {
  loading: false,
};
