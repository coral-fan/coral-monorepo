import { Story, Meta } from '@storybook/react';
import { Toggle } from './Toggle';

export default {
  title: 'Coral/UI/Toggle',
  component: Toggle,
} as Meta;

const Template: Story = (args) => <Toggle {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Label',
};
