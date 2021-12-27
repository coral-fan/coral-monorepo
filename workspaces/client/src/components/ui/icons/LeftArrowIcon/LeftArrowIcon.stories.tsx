import { Story, Meta } from '@storybook/react';
import { LeftArrowIcon } from 'components/ui/icons';
import { SingleIconProps } from '../../Icon/types';

export default {
  title: 'Coral/Icons/Left Arrow',
  component: LeftArrowIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<SingleIconProps> = (args) => <LeftArrowIcon {...args} />;

export const Default = Template.bind({});
