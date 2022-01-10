import { Story, Meta } from '@storybook/react';
import { Transaction, TransactionProps } from './Transaction';

export default {
  title: 'Coral/Pages/Asset/Transaction',
  component: Transaction,
  argTypes: {
    timestamp: {
      control: { type: 'date' },
    },
  },
} as Meta;

const Template: Story<TransactionProps> = (args) => <Transaction {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://www.stereofox.com/images/86513/resized.jpg',
  description: '1 token claimed',
  username: '@bonobooooos',
};
