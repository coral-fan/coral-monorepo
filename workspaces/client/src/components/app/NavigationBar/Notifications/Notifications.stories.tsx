import { Story, Meta } from '@storybook/react';
import { Notifications, NotificationsProp } from './Notifications';

export default {
  title: 'Coral/App/Notifications',
  component: Notifications,
} as Meta;

const Template: Story<NotificationsProp> = (args) => <Notifications {...args} />;

export const Default = Template.bind({});

Default.args = {
  notifications: [
    {
      heading: 'Transaction Success!',
      message: 'Bonobo - Behind the scenes bo10293817101',
      timestamp: new Date().toLocaleString(),
    },
    {
      heading: 'Transaction Success!',
      message: 'Bonobo - Behind the scenes bo1029312323',
      timestamp: new Date().toDateString(),
    },
  ],
};
