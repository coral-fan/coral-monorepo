import { Story, Meta } from '@storybook/react';
import { IconButton } from './IconButton';

export default {
  title: 'Coral/Buttons/Icon Button',
  component: IconButton,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
} as Meta;

const PlusIcon = (
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

const Template: Story = (args) => <IconButton {...args} />;

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

export const PrimaryAddButton = Template.bind({});
PrimaryAddButton.args = {
  icon: PlusIcon,
  variant: 'primary',
  loading: false,
};
