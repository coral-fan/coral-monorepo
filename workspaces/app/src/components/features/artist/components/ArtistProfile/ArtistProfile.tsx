import styled from '@emotion/styled';
import { Profile } from 'components/ui';
import { Collections } from '../Collections';
import { Artist } from 'libraries/models';
import { Tag } from './components';

interface ArtistProfileProps {
  artistData: Artist;
}

const ArtistTag = styled(Tag)`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: -8px;
`;

export const ArtistProfile = ({ artistData }: ArtistProfileProps) => {
  const { name, bio, profilePhoto, socialHandles, collections } = artistData;

  const artistTag = <ArtistTag>Artist</ArtistTag>;
  const artistCollections = <Collections collections={collections} />;

  return (
    <Profile
      username={name}
      profilePhoto={profilePhoto}
      bio={bio}
      socialHandles={socialHandles}
      artistTag={artistTag}
      collections={artistCollections}
    />
  );
};
