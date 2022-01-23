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
    variant: {
      options: ['default', 'mini', 'reveal'],
      control: { type: 'select' },
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
  timestamp: oneHour.toISOString(),
  variant: 'default',
};

export const Today = Template.bind({});
Today.args = {
  timestamp: laterToday.toISOString(),
  variant: 'default',
};

export const Tomorrow = Template.bind({});
Tomorrow.args = {
  timestamp: tomorrow.toISOString(),
  variant: 'default',
};

export const NextWeek = Template.bind({});
NextWeek.args = {
  timestamp: nextWeek.toISOString(),
  variant: 'default',
};

export const NextMonth = Template.bind({});
NextMonth.args = {
  timestamp: nextMonth.toISOString(),
  variant: 'default',
};

export const Mini = Template.bind({});
Mini.args = {
  timestamp: oneHour.toISOString(),
  variant: 'mini',
};

export const RevealedIn = Template.bind({});
RevealedIn.args = {
  timestamp: oneHour.toISOString(),
  variant: 'reveal',
};
