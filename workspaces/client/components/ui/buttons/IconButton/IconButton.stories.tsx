import { Story, Meta } from '@storybook/react';
import { IconButton } from './IconButton';
import { BaseButtonProps } from '../types';
import { AddIconDefault } from 'components/ui/icons/AddIcon/AddIcon.stories';

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

const Template: Story<BaseButtonProps> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  loading: false,
  children: <AddIconDefault {...AddIconDefault.args} />,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  loading: false,
  children: <AddIconDefault {...AddIconDefault.args} />,
};
