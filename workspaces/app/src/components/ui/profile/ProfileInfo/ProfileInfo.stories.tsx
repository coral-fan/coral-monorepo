import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileInfo } from './ProfileInfo';
import { DEFAULT_PROFILE_PHOTO } from '../Avatar/consts';

export default {
  title: 'Coral/UI/Profile/Profile Info',
  component: ProfileInfo,
} as ComponentMeta<typeof ProfileInfo>;

const Template: ComponentStory<typeof ProfileInfo> = (args) => <ProfileInfo {...args} />;

export const Default = Template.bind({});

Default.args = {
  username: 'Bonobo',
  secondaryInfo: 'Artist',
  profilePhoto: DEFAULT_PROFILE_PHOTO,
};
