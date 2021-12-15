import { Story, Meta } from '@storybook/react';
import { Heading } from '.';

export default {
  title: 'Coral/Heading',
  component: Heading,
} as Meta;

const Template: Story = (args) => <Heading {...args}>Heading</Heading>;

export const Level1 = Template.bind({});
Level1.args = {};
