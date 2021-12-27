import { Story, Meta } from '@storybook/react';
import { LeftArrowIcon } from 'components/ui/icons';
import { IconProps } from 'components/ui/Icon';

export default {
  title: 'Coral/Icons/Left Arrow',
  component: LeftArrowIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<IconProps> = (args) => <LeftArrowIcon {...args} />;

export const Default = Template.bind({});
