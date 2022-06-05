import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AllAccessBadge } from './AllAccessBadge';

export default {
  title: 'Coral/UI/Badges/All Access Badge',
  component: AllAccessBadge,
} as ComponentMeta<typeof AllAccessBadge>;

const Template: ComponentStory<typeof AllAccessBadge> = () => <AllAccessBadge />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
