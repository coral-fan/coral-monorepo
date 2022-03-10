/* eslint-disable jsx-a11y/alt-text */
import { Story, Meta } from '@storybook/react';
import { Image, ImageProp } from './Image';

export default {
  title: 'Coral/UI/Image',
  component: Image,
} as Meta;

const Template: Story<ImageProp> = ({ ...args }) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://www.stereofox.com/images/86513/resized.jpg',
};
