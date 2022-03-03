import { Story, Meta } from '@storybook/react';
import { ImageWithInfo, ImageWithInfoProps } from './ImageWithInfo';

export default {
  title: 'Coral/UI/NFT/Image with Info',
  component: ImageWithInfo,
} as Meta;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: Story<ImageWithInfoProps> = ({ ...args }) => <ImageWithInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://www.stereofox.com/images/86513/resized.jpg',
  profilePhoto: {
    src: 'https://www.stereofox.com/images/86513/resized.jpg',
    offsetPercentages: [0, 0],
    scale: 1,
  },
  artist: 'Bonobo',
};
