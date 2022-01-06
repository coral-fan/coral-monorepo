import { Story, Meta } from '@storybook/react';
import { Info } from './Info';
import { InfoProps } from './types';

export default {
  title: 'Coral/UI/Profile/User Info',
  component: Info,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<InfoProps> = (args) => <Info {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: 'https://www.stereofox.com/images/86513/resized.jpg',
  name: 'Bonobo',
  username: '@bonobooooos',
  size: 'sm',
};
