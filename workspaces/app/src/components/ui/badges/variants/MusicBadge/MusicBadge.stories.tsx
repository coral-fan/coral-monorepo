import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MusicBadge } from './MusicBadge';

export default {
  title: 'Coral/UI/Badges/Music Badge',
  component: MusicBadge,
} as ComponentMeta<typeof MusicBadge>;

const Template: ComponentStory<typeof MusicBadge> = () => <MusicBadge />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
