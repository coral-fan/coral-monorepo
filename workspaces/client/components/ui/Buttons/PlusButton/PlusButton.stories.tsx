import { Story, Meta } from '@storybook/react';
import { PlusButton } from './PlusButton';

export default {
  title: 'Coral/Buttons/Plus Button',
  component: PlusButton,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
} as Meta;

const PlusButtonTemplate: Story = (args) => <PlusButton {...args} />;

export const Primary = PlusButtonTemplate.bind({});
Primary.args = {
  variant: 'primary',
  loading: false,
};

export const Secondary = PlusButtonTemplate.bind({});
Secondary.args = {
  variant: 'secondary',
  loading: false,
};
