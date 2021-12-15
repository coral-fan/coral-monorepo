import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './Button';

// icon for storybook
const PLUS_ICON = (
  <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.1875 15.5H25.8125"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 5.18753V25.8125"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default {
  title: 'Coral/Buttons/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  loading: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  loading: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'primary',
  loading: false,
  icon: PLUS_ICON,
};
