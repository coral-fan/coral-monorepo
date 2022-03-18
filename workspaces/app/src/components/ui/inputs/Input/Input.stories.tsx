import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './Input';

export default {
  title: 'Coral/UI/inputs/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({ label, ...args }) => (
  <Input label={label} {...args} />
);

const defaultArgs = {
  label: 'label',
  placeholder: 'Placeholder',
};

export const Default = Template.bind({});

Default.args = defaultArgs;

export const Error = Template.bind({});

Error.args = {
  ...defaultArgs,
  error: 'Error message',
};
