import styled from '@emotion/styled';
import { Profile } from 'components/ui';
import { Collections } from '../Collections';
import { Artist } from 'libraries/models';
import { Tag as BaseTag } from './components';
import { useMemo } from 'react';

interface ArtistProfileProps {
  artistData: Artist;
  tag?: string;
}

const Tag = styled(BaseTag)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: -8px;
`;

export const ArtistProfile = ({ artistData }: ArtistProfileProps) => {
  const { name, bio, profilePhoto, socialHandles, collections, tag = 'artist' } = artistData;

  const artistCollections = useMemo(() => <Collections collections={collections} />, [collections]);

  const artistTag = useMemo(() => <Tag>{tag}</Tag>, [tag]);

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
