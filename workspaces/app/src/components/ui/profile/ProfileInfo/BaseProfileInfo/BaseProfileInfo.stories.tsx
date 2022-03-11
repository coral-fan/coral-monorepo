import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BaseProfileInfo } from './BaseProfileInfo';
import { DEFAULT_PROFILE_PHOTO } from '../../Avatar/consts';

export default {
  title: 'Coral/UI/Profile/Profile Info',
  component: BaseProfileInfo,
} as ComponentMeta<typeof BaseProfileInfo>;

const Template: ComponentStory<typeof BaseProfileInfo> = (args) => <BaseProfileInfo {...args} />;

export const Default = Template.bind({});

Default.args = {
  username: 'Bonobo',
  secondaryInfo: 'Artist',
  profilePhoto: DEFAULT_PROFILE_PHOTO,
};
