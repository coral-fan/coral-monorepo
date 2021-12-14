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

const Template: Story = (args) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  loading: false,
  icon: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  loading: false,
  icon: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'primary',
  loading: false,
  icon: false,
};
