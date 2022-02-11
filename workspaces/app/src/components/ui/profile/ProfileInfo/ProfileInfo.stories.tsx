import { Story, Meta } from '@storybook/react';
import { ProfileInfo } from './ProfileInfo';
import { ProfileInfoProps } from './ProfileInfo';

export default {
  title: 'Coral/UI/Profile/Profile Info',
  component: ProfileInfo,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<ProfileInfoProps> = (args) => <ProfileInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: 'https://www.stereofox.com/images/86513/resized.jpg',
  name: 'Bonobo',
  username: '@bonobooooos',
  size: 'sm',
};
