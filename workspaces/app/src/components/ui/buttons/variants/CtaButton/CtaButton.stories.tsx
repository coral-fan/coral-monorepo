import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CtaButton } from './CtaButton';

export default {
  title: 'Coral/UI/Buttons/CTA Button',
  component: CtaButton,
} as ComponentMeta<typeof CtaButton>;

const Template: ComponentStory<typeof CtaButton> = (args) => (
  <CtaButton {...args}>Button</CtaButton>
);

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
