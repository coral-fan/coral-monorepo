import { Story, Meta } from '@storybook/react';
import { DropTimer, DropTimerProp } from './DropTimer';

export default {
  title: 'Coral/Pages/Asset/Drop Timer',
  component: DropTimer,
  argTypes: {
    date: {
      control: { type: 'date' },
    },
  },
} as Meta;

const Template: Story<DropTimerProp> = (date) => <DropTimer {...date} />;

export const Default = Template.bind({});
Default.args = {
  date: '2022-01-27T18:45:00Z',
};
