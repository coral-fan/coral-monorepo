import { Story, Meta } from '@storybook/react';
import { PreviousButton } from './PreviousButton';

export default {
  title: 'Coral/Modal/Previous Button',
  component: PreviousButton,
} as Meta;

const Template: Story = () => <PreviousButton />;

export const Default = Template.bind({});
