import { Story, Meta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Coral/Button',
  component: Button,
} as Meta;

const Template: Story = (args) => <Button {...args}>Button</Button>;

// export const Primary = Template.bind({});
// Primary.args = {
//   variant: 'primary',
// };

export const Default = Template.bind({});
