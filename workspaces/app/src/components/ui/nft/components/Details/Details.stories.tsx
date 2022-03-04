import { Story, Meta } from '@storybook/react';
import { Details, DetailsProp } from './Details';

export default {
  title: 'Coral/UI/NFT/Components/Details',
  component: Details,
} as Meta;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: Story<DetailsProp> = ({ ...args }) => <Details {...args} />;

export const Default = Template.bind({});
Default.args = {
  details: [
    'A personal call between just you and Bonobo',
    'Available any time before March 1st, 2022',
    "Accessible by Zoom after you've torn the ticket",
  ],
};
