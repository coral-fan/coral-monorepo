import { Story, Meta } from '@storybook/react';
import { CtaButton, BaseButtonProps as ButtonProps } from 'components/ui';

export default {
  title: 'Coral/UI/Buttons/CTA Button',
  component: CtaButton,
} as Meta;

const Template: Story<ButtonProps> = (args) => <CtaButton {...args}>Button</CtaButton>;

export const Default = Template.bind({});
Default.args = {
  loading: false,
};
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
