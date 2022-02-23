import { Story, Meta } from '@storybook/react';
import { DropTimer } from './DropTimer';
import { DropTimerProps } from './DropTimer';

export default {
  title: 'Coral/ui/Drop Timer',
  component: DropTimer,
  argTypes: {
    timestamp: {
      control: { type: 'date' },
    },
  },
} as Meta;

const Template: Story<DropTimerProps> = (args) => <DropTimer {...args} />;

const today = new Date();

// Countdown starts
const oneHour = new Date(today.getTime() + 1000 * 60 * 60);
const laterToday = new Date(today.getTime() + 1000 * 60 * 60 * 6);
const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);
const nextWeek = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 7);
const nextMonth = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30);

export const OneHour = Template.bind({});
OneHour.args = {
  tokenSupply: 5000,
  timestamp: oneHour.toISOString(),
};

export const Today = Template.bind({});
Today.args = {
  tokenSupply: 5000,
  timestamp: laterToday.toISOString(),
};

export const Tomorrow = Template.bind({});
Tomorrow.args = {
  tokenSupply: 5000,
  timestamp: tomorrow.toISOString(),
};

export const NextWeek = Template.bind({});
NextWeek.args = {
  tokenSupply: 5000,
  timestamp: nextWeek.toISOString(),
};

export const NextMonth = Template.bind({});
NextMonth.args = {
  tokenSupply: 5000,
  timestamp: nextMonth.toISOString(),
};
