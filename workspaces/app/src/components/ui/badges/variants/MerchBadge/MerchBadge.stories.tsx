import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MerchBadge } from './MerchBadge';

export default {
  title: 'Coral/UI/Badges/Merch Badge',
  component: MerchBadge,
} as ComponentMeta<typeof MerchBadge>;

const Template: ComponentStory<typeof MerchBadge> = () => <MerchBadge />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
