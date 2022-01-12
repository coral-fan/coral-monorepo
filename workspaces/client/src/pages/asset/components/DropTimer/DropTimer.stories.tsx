import { Story, Meta } from '@storybook/react';
import { DropTimer, DropTimerProp } from './DropTimer';

export default {
  title: 'Coral/Pages/Asset/Drop Timer',
  component: DropTimer,
  argTypes: {
    timestamp: {
      control: { type: 'date' },
    },
    size: {
      options: ['sm', 'lg'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<DropTimerProp> = (args) => <DropTimer {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  timestamp: '2022-01-18T22:35:00Z',
};
