import styled from '@emotion/styled';
import { Link, SocialLinks } from 'components/ui';
import { ArtistInfo as ArtistBadge } from 'components/ui/nft/components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ArtistInfo = () => (
  <Container>
    <Link href={`/artist/${1}`}>
      <ArtistBadge
        profilePhoto={{
          src: 'https://www.stereofox.com/images/86513/resized.jpg',
          offsetPercentages: [0, 0],
          scale: 1,
        }}
      >
        Bonobo
      </ArtistBadge>
    </Link>
    <SocialLinks
      socialHandles={{
        facebook: null,
        twitter: '',
        instagram: '',
        spotify: null,
        tiktok: null,
        soundcloud: '',
        discogs: null,
      }}
    />
  </Container>
);
