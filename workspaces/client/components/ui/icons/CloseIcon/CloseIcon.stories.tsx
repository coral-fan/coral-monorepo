import { Story, Meta } from '@storybook/react';
import { CloseIcon } from 'components/ui/icons';
import { SingleIconProps } from '../types';

export default {
  title: 'Coral/Icons',
  component: CloseIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<SingleIconProps> = (args) => <CloseIcon {...args} />;

export const Close = Template.bind({});
