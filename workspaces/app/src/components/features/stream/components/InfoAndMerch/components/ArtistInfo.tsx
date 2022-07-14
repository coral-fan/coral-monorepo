import styled from '@emotion/styled';
import { Link, SocialLinks } from 'components/ui';
import { CreatorInfo as ArtistBadge } from 'components/ui/nft/components';
import { Artist } from 'libraries/models';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

type ArtistInfoProps = Pick<Artist, 'id' | 'profilePhoto' | 'socialHandles' | 'name'>;
export const ArtistInfo = ({ id, profilePhoto, name, socialHandles }: ArtistInfoProps) => (
  <Container>
    <Link href={`/artist/${id}`}>
      <ArtistBadge profilePhoto={profilePhoto}>{name}</ArtistBadge>
    </Link>
    <SocialLinks socialHandles={socialHandles} />
  </Container>
);
