import { Story, ComponentMeta } from '@storybook/react';
import { Heading, HeadingProp } from './Heading';

export default {
  title: 'Coral/UI/Heading',
  component: Heading,
  argTypes: {
    level: {
      options: [1, 2, 3],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Heading>;

const Template: Story<HeadingProp> = ({ level }) => (
  <Heading level={level}>{`Heading Level ${level}`}</Heading>
);

export const h1 = Template.bind({});
h1.args = {
  level: 1,
};
export const h2 = Template.bind({});
h2.args = {
  level: 2,
};
export const h3 = Template.bind({});
h3.args = {
  level: 3,
};
