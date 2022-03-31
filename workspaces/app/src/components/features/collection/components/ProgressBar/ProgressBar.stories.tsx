import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

export default {
  title: 'Coral/Pages/Drop/Progress Bar',
  component: ProgressBar,
  argTypes: {
    numMinted: {
      control: { type: 'range', min: 0, max: 10000, step: 1 },
    },
    maxMintable: {
      control: { type: 'range', min: 1, max: 10000, step: 1 },
    },
  },
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args}></ProgressBar>
);

export const Default = Template.bind({});
Default.args = {
  numMinted: 1000,
  maxMintable: 10000,
};
