import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextArea } from './TextArea';

export default {
  title: 'Coral/UI/inputs/Text Area',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = ({ label, ...args }) => (
  <TextArea label={label} {...args} />
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
