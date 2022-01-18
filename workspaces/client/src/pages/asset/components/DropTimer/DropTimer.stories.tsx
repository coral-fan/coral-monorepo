import { Story, Meta } from '@storybook/react';
import { DropTimer } from './DropTimer';
import { DropTimerProps } from './types';

export default {
  title: 'Coral/Pages/Asset/Drop Timer',
  component: DropTimer,
  argTypes: {
    timestamp: {
      control: { type: 'none' },
    },
    variant: {
      options: [undefined, 'mini', 'reveal'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<DropTimerProps> = (args) => <DropTimer {...args} />;

const today = new Date();

// Countdown starts
const oneHour = new Date(today.getTime() + 1000 * 60 * 60 * 1.1);
const laterToday = new Date(today.getTime() + 1000 * 60 * 60 * 6);
const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 36);
const nextWeek = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 6);
const nextMonth = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30);

export const OneHour = Template.bind({});
OneHour.args = {
  variant: undefined,
  timestamp: oneHour.toISOString(),
};

export const Today = Template.bind({});
Today.args = {
  variant: undefined,
  timestamp: laterToday.toISOString(),
};

export const Tomorrow = Template.bind({});
Tomorrow.args = {
  variant: undefined,
  timestamp: tomorrow.toISOString(),
};

export const NextWeek = Template.bind({});
NextWeek.args = {
  variant: undefined,
  timestamp: nextWeek.toISOString(),
};

export const NextMonth = Template.bind({});
NextMonth.args = {
  variant: undefined,
  timestamp: nextMonth.toISOString(),
};
