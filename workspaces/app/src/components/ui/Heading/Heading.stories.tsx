import { Story, ComponentMeta } from '@storybook/react';
import { Heading, HeadingProps } from './Heading';

export default {
  title: 'Coral/UI/Heading',
  component: Heading,
  argTypes: {
    level: {
      options: [1, 2, 3, 4],
      control: { type: 'select' },
    },
    styleVariant: {
      options: ['h1', 'h2', 'h3', 'h4'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Heading>;

const Template: Story<HeadingProps> = ({ level, styleVariant }) => (
  <Heading level={level} styleVariant={styleVariant}>{`Heading ${level}`}</Heading>
);

export const level1 = Template.bind({});
level1.args = {
  level: 1,
  styleVariant: 'h1',
};

export const level2 = Template.bind({});
level2.args = {
  level: 2,
  styleVariant: 'h2',
};

export const level3 = Template.bind({});
level3.args = {
  level: 3,
  styleVariant: 'h3',
};

export const level4 = Template.bind({});
level4.args = {
  level: 4,
  styleVariant: 'h4',
};
