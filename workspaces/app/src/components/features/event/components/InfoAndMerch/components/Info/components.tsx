import styled from '@emotion/styled';
import { SocialLinks } from 'components/ui';
import { ArtistInfo as ArtistBadge } from 'components/ui/nft/components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ArtistInfo = () => (
  <Container>
    <ArtistBadge
      profilePhoto={{
        src: 'https://www.stereofox.com/images/86513/resized.jpg',
        offsetPercentages: [0, 0],
        scale: 1,
      }}
    >
      Bonobo
    </ArtistBadge>
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
