import { Story, Meta } from '@storybook/react';
import { BaseProfileInfo } from './BaseProfileInfo';
import { BaseProfileInfoProps } from '../types';

export default {
  title: 'Coral/UI/Profile/Profile Info',
  component: BaseProfileInfo,
} as Meta;

const Template: Story<BaseProfileInfoProps> = (args) => (
  <BaseProfileInfo {...args}>Secondary Info</BaseProfileInfo>
);

export const Default = Template.bind({});
Default.args = {
  username: 'Bonobo',
  profilePhoto: {
    src: 'https://www.stereofox.com/images/86513/resized.jpg',
    offsetPercentages: [0, 0],
    scale: 1,
  },
};
