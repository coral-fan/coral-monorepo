import { Story, Meta } from '@storybook/react';
import { IconButton } from './IconButton';
import { BaseButtonProps } from '../types';
import { PlusIcon } from 'components/ui';

export default {
  title: 'Coral/Buttons/Icon Button',
  component: IconButton,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<BaseButtonProps> = ({ children, ...args }) => (
  <IconButton {...args}>{children}</IconButton>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  loading: false,
  children: <PlusIcon />,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  loading: false,
  children: <PlusIcon />,
};
