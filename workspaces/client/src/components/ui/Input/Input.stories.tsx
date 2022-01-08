import { Story, Meta } from '@storybook/react';
import { Input } from './Input';

export default {
  title: 'Coral/UI/Input',
  component: Input,
} as Meta;

const Template: Story = ({ label, ...args }) => <Input label={label} {...args} />;

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
