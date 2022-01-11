import { Story, Meta } from '@storybook/react';
import { TransactionHistory, TransactionsProp } from './TransactionHistory';

export default {
  title: 'Coral/Pages/Asset/Transaction History',
  component: TransactionHistory,
} as Meta;

const Template: Story<TransactionsProp> = (args) => <TransactionHistory {...args} />;

export const NoTransactions = Template.bind({});
NoTransactions.args = {
  transactions: [],
};

export const Default = Template.bind({});
Default.args = {
  transactions: [
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
    {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      description: '1 token claimed',
      username: '@bonobooooos',
      timestamp: new Date().toDateString(),
    },
  ],
};
