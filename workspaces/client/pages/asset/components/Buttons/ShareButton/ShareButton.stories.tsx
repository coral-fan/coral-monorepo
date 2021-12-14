import { Story, Meta } from '@storybook/react';
import { ShareButton } from './ShareButton';

export default {
  title: 'Coral/Buttons/Share Button',
  component: ShareButton,
} as Meta;

const Template: Story = (args) => <ShareButton {...args}>Share</ShareButton>;

export const Primary = Template.bind({});
Primary.args = {
  loading: false,
};
