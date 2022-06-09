import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EventBadge } from './EventBadge';

export default {
  title: 'Coral/UI/Badges/Event Badge',
  component: EventBadge,
} as ComponentMeta<typeof EventBadge>;

const Template: ComponentStory<typeof EventBadge> = () => <EventBadge />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
