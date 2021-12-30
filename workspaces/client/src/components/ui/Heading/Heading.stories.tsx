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

const Template: Story<HeadingProp> = ({ level }) => <Heading level={level}>{`H${level}`}</Heading>;

export const level1 = Template.bind({});
level1.args = {
  level: 1,
};
export const level2 = Template.bind({});
level2.args = {
  level: 2,
};
export const level3 = Template.bind({});
level3.args = {
  level: 3,
};
