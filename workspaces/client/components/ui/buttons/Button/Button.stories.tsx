import { Story, Meta } from '@storybook/react';
import { Button } from './Button';
import { ButtonProps } from 'components/ui';
import { PlusIcon } from 'components/ui';

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
  icon: <PlusIcon />,
};
