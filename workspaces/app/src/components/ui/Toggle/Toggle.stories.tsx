import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Toggle } from './Toggle';

export default {
  title: 'Coral/UI/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = ({ children }) => <Toggle>{children}</Toggle>;

export const Default = Template.bind({});

Default.args = {
  children: 'Label',
};
