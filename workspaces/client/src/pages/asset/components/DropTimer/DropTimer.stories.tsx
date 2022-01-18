import { Story, Meta } from '@storybook/react';
import { DropTimer } from './DropTimer';
import { DropTimerProp } from './types';

export default {
  title: 'Coral/Pages/Asset/Drop Timer',
  component: DropTimer,
  argTypes: {
    timestamp: {
      control: { type: 'none' },
    },
    variant: {
      options: [undefined, 'mini'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<DropTimerProp> = (args) => <DropTimer {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: undefined,
  timestamp: '2022-01-31T22:35:00Z',
};
