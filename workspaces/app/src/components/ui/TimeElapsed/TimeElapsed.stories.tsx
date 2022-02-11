import { Story, Meta } from '@storybook/react';
import { TimeElapsed, TimeElapsedProp } from './TimeElapsed';

export default {
  title: 'Coral/UI/Time Elapsed',
  component: TimeElapsed,
  argTypes: {
    date: {
      control: { type: 'date' },
    },
  },
} as Meta;

const Template: Story<TimeElapsedProp> = (date) => <TimeElapsed {...date} />;

export const Default = Template.bind({});
