import { Story, Meta } from '@storybook/react';
import { Toggle } from './Toggle';

export default {
  title: 'Coral/UI/Toggle',
  component: Toggle,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta;

const Template: Story = () => <Toggle />;

export const Default = Template.bind({});
