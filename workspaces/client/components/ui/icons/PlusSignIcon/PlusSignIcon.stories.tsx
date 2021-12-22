import { Story, Meta } from '@storybook/react';
import { PlusSignIcon } from 'components/ui/icons';
import { SingleIconProps } from '../types';

export default {
  title: 'Coral/Icons',
  component: PlusSignIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<SingleIconProps> = (args) => <PlusSignIcon {...args} />;

export const PlusSign = Template.bind({});
