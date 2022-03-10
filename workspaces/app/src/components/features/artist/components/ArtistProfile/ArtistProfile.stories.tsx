import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BASE_ARTIST_PROFILE_DEFAULT_ARGS } from './consts';
import { ArtistProfile } from './ArtistProfile';

export default {
  title: 'Coral/Pages/Artist/Artist Profile',
  component: ArtistProfile,
  args: {},
} as ComponentMeta<typeof ArtistProfile>;

const Template: ComponentStory<typeof ArtistProfile> = (args) => <ArtistProfile {...args} />;

export const Default = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- using destructuring to remove property without mutating object

Default.args = {
  ...BASE_ARTIST_PROFILE_DEFAULT_ARGS,
};
