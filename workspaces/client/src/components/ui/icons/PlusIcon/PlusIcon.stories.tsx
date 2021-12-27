import { Story, Meta } from '@storybook/react';
import { PlusIcon } from 'components/ui/icons';
import { IconProps } from 'components/ui/Icon';

export default {
  title: 'Coral/Icons/Plus Icon',
  component: PlusIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<IconProps> = (args) => <PlusIcon {...args} />;

export const Default = Template.bind({});
