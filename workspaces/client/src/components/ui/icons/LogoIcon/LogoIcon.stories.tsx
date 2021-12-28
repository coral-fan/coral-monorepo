import { Story, Meta } from '@storybook/react';
import { LogoIcon } from './LogoIcon';
import { IconProps } from 'components/ui/Icon';

export default {
  title: 'Coral/Icons/Logo Icon',
  component: LogoIcon,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<IconProps> = (args) => <LogoIcon {...args} />;

export const Default = Template.bind({});
