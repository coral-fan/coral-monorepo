import { Story, Meta } from '@storybook/react';
import { AddIcon, AddIconProps } from 'components/ui/icons';

export default {
  title: 'Coral/Icons/Add Icon',
  component: AddIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<AddIconProps> = (args) => <AddIcon {...args} />;

export const AddIconDefault = Template.bind({});
