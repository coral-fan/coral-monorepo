import { Story, Meta } from '@storybook/react';
import { PlusButton } from './PlusButton';

export default {
  title: 'Coral/Plus Button',
  component: PlusButton,
} as Meta;

const PlusButtonTemplate: Story = (args) => <PlusButton {...args} />;

export const Primary = PlusButtonTemplate.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = PlusButtonTemplate.bind({});
Secondary.args = {
  variant: 'secondary',
};
