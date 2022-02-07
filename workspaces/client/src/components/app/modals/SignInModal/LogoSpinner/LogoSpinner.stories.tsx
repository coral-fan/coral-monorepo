import { Meta, Story } from '@storybook/react';
import { LogoSpinnerProps } from '.';
import { LogoSpinner } from './LogoSpinner';

export default {
  title: `Coral/App/Sign In Modal/Logo Spinner`,
  component: LogoSpinner,
  argTypes: {
    size: {
      control: { type: 'range' },
    },
  },
} as Meta;

const Template: Story<LogoSpinnerProps> = (args) => <LogoSpinner {...args} />;

const Default = Template.bind({});

export { Default };
