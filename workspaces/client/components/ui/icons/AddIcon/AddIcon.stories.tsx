import { Story, Meta } from '@storybook/react';
import { AddIcon, AddIconProps } from 'components/ui/icons';

export default {
  title: 'Coral/Icons/Add Icon',
  component: AddIcon,
} as Meta;

const Template: Story<AddIconProps> = (args) => <AddIcon {...args} />;

export const AddIconDefault = Template.bind({});
