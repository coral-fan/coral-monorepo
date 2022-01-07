import { Story, Meta } from '@storybook/react';
import { TransactionItem, TransactionItemProps } from './TransactionItem';

export default {
  title: 'Coral/Pages/Asset/Transaction Item',
  component: TransactionItem,
  argTypes: {
    txTimestamp: {
      control: { type: 'date' },
    },
  },
} as Meta;

const Template: Story<TransactionItemProps> = (args) => <TransactionItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://www.stereofox.com/images/86513/resized.jpg',
  txDesc: '1 token claimed',
  username: '@bonobooooos',
};
