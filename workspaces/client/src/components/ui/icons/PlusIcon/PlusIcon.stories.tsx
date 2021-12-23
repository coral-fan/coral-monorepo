import { Story, Meta } from '@storybook/react';
import { PlusIcon } from 'components/ui/icons';
import { SingleIconProps } from '../types';

export default {
  title: 'Coral/Icons/Plus Icon',
  component: PlusIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<SingleIconProps> = (args) => <PlusIcon {...args} />;

export const Default = Template.bind({});
