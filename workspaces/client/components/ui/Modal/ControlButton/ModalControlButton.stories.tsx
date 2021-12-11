import { Story, Meta } from '@storybook/react';
import { ModalControlButton } from './ModalControlButton';

export default {
  title: 'Coral/Modal/Control Button',
  component: ModalControlButton,
} as Meta;

const Template: Story = ({ variant, ...args }) => (
  <ModalControlButton variant={variant} {...args} />
);

export const Close = Template.bind({});
Close.args = {
  variant: 'close',
};

export const Previous = Template.bind({});
Previous.args = {
  variant: 'previous',
};
