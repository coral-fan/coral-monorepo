import { Story, Meta } from '@storybook/react';
import { CloseIcon } from 'components/ui/icons';
import { IconProps } from 'components/ui/Icon';

export default {
  title: 'Coral/Icons/Close Icon',
  component: CloseIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<IconProps> = (args) => <CloseIcon {...args} />;

export const Default = Template.bind({});
