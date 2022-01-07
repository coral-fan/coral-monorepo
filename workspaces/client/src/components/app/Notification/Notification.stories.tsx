import { Story, Meta } from '@storybook/react';
import { Notification, NotificationProps } from './Notification';

export default {
  title: 'Coral/App/Notification',
  component: Notification,
  argTypes: {
    timestamp: {
      control: { type: 'date' },
    },
  },
} as Meta;

const Template: Story<NotificationProps> = (args) => <Notification {...args} />;

export const Default = Template.bind({});

Default.args = {
  heading: 'Transaction Success!',
  message: 'Bonobo - Behind the scenes bo10293817101',
  timestamp: new Date().toLocaleString(),
};
