import { Story, Meta } from '@storybook/react';
import { Button } from './Button';
import { BaseButtonProps } from '../types';
import { AddIconDefault } from 'components/ui/icons/AddIcon/AddIcon.stories';

export default {
  title: 'Coral/Buttons/Button',
  component: Button,
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

const Template: Story<BaseButtonProps> = (args) => <Button {...args}></Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  loading: false,
  children: <>Button</>,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  loading: false,
  children: <>Button</>,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'primary',
  loading: false,
  children: (
    <>
      <AddIconDefault {...AddIconDefault.args} />
      Button
    </>
  ),
};
