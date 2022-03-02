import { Story, Meta } from '@storybook/react';
import { AssetImage, AssetImageProps } from './AssetImage';

export default {
  title: 'Coral/Asset/Image with Info',
  component: AssetImage,
} as Meta;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: Story<AssetImageProps> = ({ ...args }) => <AssetImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://www.stereofox.com/images/86513/resized.jpg',
  altText: 'Photo of Bonobo',
  profilePhoto: {
    src: 'https://www.stereofox.com/images/86513/resized.jpg',
    offsetPercentages: [0, 0],
    scale: 1,
  },
  artist: 'Bonobo',
};
