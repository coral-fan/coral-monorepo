import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Toggle } from './Toggle';

export default {
  title: 'Coral/UI/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Label',
};
