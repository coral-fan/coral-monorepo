import { Story, Meta } from '@storybook/react';
import { Info, InfoProps } from './Info';

export default {
  title: 'Coral/UI/Profile/User Info',
  component: Info,
} as Meta;

const Template: Story<InfoProps> = (args) => <Info {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'Bonobo',
  username: '@bonobooooos',
};
