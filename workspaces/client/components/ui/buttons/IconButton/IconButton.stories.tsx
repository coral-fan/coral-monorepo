import { Story, Meta } from '@storybook/react';
import { IconButton, IconButtonProps } from './IconButton';
import { PLUS_ICON, SHARE_ICON } from '../consts/storybook';

const ICONS = { PLUS_ICON, SHARE_ICON };

export default {
  title: 'Coral/Buttons/Icon Button',
  component: IconButton,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    icon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: 'select',
        labels: {
          PLUS_ICON: 'Add',
          SHARE_ICON: 'Share',
        },
      },
    },
  },
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  loading: false,
  icon: PLUS_ICON,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  loading: false,
  icon: PLUS_ICON,
};
