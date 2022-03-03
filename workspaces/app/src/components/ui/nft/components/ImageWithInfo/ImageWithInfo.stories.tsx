import { Story, Meta } from '@storybook/react';
import { ImageWithInfo, ImageWithInfoProps } from './ImageWithInfo';
import { imageWithInfoDefaultArgs } from './consts';

export default {
  title: 'Coral/UI/NFT/Components/Image with Info',
  component: ImageWithInfo,
} as Meta;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: Story<ImageWithInfoProps> = ({ ...args }) => <ImageWithInfo {...args} />;

export const Default = Template.bind({});

Default.args = imageWithInfoDefaultArgs;
