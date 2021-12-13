import { Story, Meta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Coral/Buttons/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
} as Meta;

const ButtonTemplate: Story = (args) => <Button {...args}>Button</Button>;

export const Primary = ButtonTemplate.bind({});
Primary.args = {
  variant: 'primary',
  icon: false,
  loading: false,
};

export const Secondary = ButtonTemplate.bind({});
Secondary.args = {
  variant: 'secondary',
  icon: false,
  loading: false,
};

export const WithIcon = ButtonTemplate.bind({});
WithIcon.args = {
  icon: true,
  loading: false,
};
