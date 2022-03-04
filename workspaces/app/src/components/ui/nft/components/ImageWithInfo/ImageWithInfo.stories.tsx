import { Story, Meta } from '@storybook/react';
import { ImageWithInfo, ImageWithInfoProps } from './ImageWithInfo';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from './consts';

export default {
  title: 'Coral/UI/NFT/Components/Image with Info',
  component: ImageWithInfo,
} as Meta;

const Template: Story<ImageWithInfoProps> = ({ ...args }) => <ImageWithInfo {...args} />;

export const Default = Template.bind({});

Default.args = IMAGE_WITH_INFO_DEFAULT_ARGS;
