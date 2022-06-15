import styled from '@emotion/styled';
import { Profile } from 'components/ui';
import { Collections } from '../Collections';
import { Artist } from 'libraries/models';
import { Tag as BaseTag } from './components';
import { useMemo } from 'react';

interface ArtistProfileProps {
  artistData: Artist;
}

const Tag = styled(BaseTag)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: -8px;
`;

const artistTag = <Tag>Artist</Tag>;

export const ArtistProfile = ({ artistData }: ArtistProfileProps) => {
  const { name, bio, profilePhoto, socialHandles, collections } = artistData;

  const artistCollections = useMemo(() => <Collections collections={collections} />, [collections]);

  return (
    <Profile
      username={name}
      profilePhoto={profilePhoto}
      bio={bio}
      socialHandles={socialHandles}
      artistTag={artistTag}
      items={artistCollections}
    />
  );
};
