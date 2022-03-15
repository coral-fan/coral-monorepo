import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Heading } from './Heading';

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

const Template: ComponentStory<typeof Heading> = ({ level, styleVariant }) => (
  <Heading level={level} styleVariant={styleVariant}>{`Heading ${level}`}</Heading>
);

export const Level1 = Template.bind({});
Level1.args = {
  level: 1,
  styleVariant: 'h1',
};

export const Level2 = Template.bind({});
Level2.args = {
  level: 2,
  styleVariant: 'h2',
};

export const Level3 = Template.bind({});
Level3.args = {
  level: 3,
  styleVariant: 'h3',
};

export const Level4 = Template.bind({});
Level4.args = {
  level: 4,
  styleVariant: 'h4',
};
