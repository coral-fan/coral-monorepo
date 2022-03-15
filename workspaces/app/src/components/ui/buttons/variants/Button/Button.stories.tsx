import { Story, Meta } from '@storybook/react';
import { BaseButtonProps as ButtonProps } from '../../BaseButton';
import { Button } from './Button';

export default {
  title: 'Coral/UI/Buttons/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  disabled: false,
};
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const Disabled = Template.bind({});
Disabled.args = {
  loading: false,
  disabled: true,
};
Disabled.parameters = {
  controls: { hideNoControlsWarning: true },
};
