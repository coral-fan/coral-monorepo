import { Story, Meta } from '@storybook/react';
import { CloseIcon } from 'components/ui/icons';
import { SingleIconProps } from '../types';

export default {
  title: 'Coral/Icons/Close Icon',
  component: CloseIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<SingleIconProps> = (args) => <CloseIcon {...args} />;

export const CloseIconDefault = Template.bind({});
