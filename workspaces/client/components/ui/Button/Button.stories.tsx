import { Story, Meta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Coral/Button',
  component: Button,
} as Meta;

const ButtonTemplate: Story = (args) => <Button {...args}>Button</Button>;

export const Primary = ButtonTemplate.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = ButtonTemplate.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const WithIcon = ButtonTemplate.bind({});
WithIcon.args = {
  icon: 'plus',
};
