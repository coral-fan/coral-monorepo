import { Story, Meta } from '@storybook/react';
import { Footer } from './Footer';

export default {
  title: 'Coral/App/Footer',
  component: Footer,
} as Meta;

const Template: Story = () => <Footer />;

export const Default = Template.bind({});

Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
