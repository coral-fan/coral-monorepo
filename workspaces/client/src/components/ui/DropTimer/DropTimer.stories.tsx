import { Story, Meta } from '@storybook/react';
import { createElement } from 'react';
import { DropTimer } from './DropTimer';
import { DropTimerProps } from './types';

export default {
  title: 'Coral/ui/Drop Timer',
  component: DropTimer,
  argTypes: {
    timestamp: {
      control: { type: 'date' },
    },
    variant: {
      options: [undefined, 'mini', 'reveal'],
      control: { type: 'select' },
    },
  },
} as Meta;

/*
  createElement solution that allows updating the timestamp found here:
  https://github.com/storybookjs/storybook/issues/5721
*/
const Template: Story<DropTimerProps> = (args) =>
  createElement(() => {
    return <DropTimer {...args} />;
  });

const today = new Date();

// Countdown starts
const oneHour = new Date(today.getTime() + 1000 * 60 * 60 * 1.1);
const laterToday = new Date(today.getTime() + 1000 * 60 * 60 * 6);
const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 36);
const nextWeek = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 6);
const nextMonth = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30);

export const OneHour = Template.bind({});
OneHour.args = {
  timestamp: oneHour.toISOString(),
};

export const Today = Template.bind({});
Today.args = {
  timestamp: laterToday.toISOString(),
};

export const Tomorrow = Template.bind({});
Tomorrow.args = {
  timestamp: tomorrow.toISOString(),
};

export const NextWeek = Template.bind({});
NextWeek.args = {
  timestamp: nextWeek.toISOString(),
};

export const NextMonth = Template.bind({});
NextMonth.args = {
  timestamp: nextMonth.toISOString(),
};
