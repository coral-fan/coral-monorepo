import { Story, Meta } from '@storybook/react';
import { CloseIcon, CloseIconProps } from 'components/ui/icons';

export default {
  title: 'Coral/Icons/Close Icon',
  component: CloseIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<CloseIconProps> = (args) => <CloseIcon {...args} />;

export const AddIconDefault = Template.bind({});
