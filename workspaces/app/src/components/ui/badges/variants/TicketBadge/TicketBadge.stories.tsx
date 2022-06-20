import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TicketBadge } from './TicketBadge';

export default {
  title: 'Coral/UI/Badges/Ticket Badge',
  component: TicketBadge,
} as ComponentMeta<typeof TicketBadge>;

const Template: ComponentStory<typeof TicketBadge> = () => <TicketBadge />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
