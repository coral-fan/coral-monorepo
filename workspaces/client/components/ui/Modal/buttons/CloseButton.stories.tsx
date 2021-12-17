import { Story, Meta } from '@storybook/react';
import { CloseButton } from './CloseButton';

export default {
  title: 'Coral/Modal/Close Button',
  component: CloseButton,
} as Meta;

const Template: Story = () => <CloseButton />;

export const Default = Template.bind({});

Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
