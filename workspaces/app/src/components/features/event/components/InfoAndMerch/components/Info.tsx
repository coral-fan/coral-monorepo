import styled from '@emotion/styled';
import { Heading, SocialLinks } from 'components/ui';
import { ArtistInfo as ArtistInfoBadge } from 'components/ui/nft/components';
import tokens from 'styles/tokens';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Description = styled.p`
  font-size: ${tokens.font.size.md};
`;

const ArtistInfo = () => (
  <div>
    <ArtistInfoBadge
      profilePhoto={{
        src: 'https://www.stereofox.com/images/86513/resized.jpg',
        offsetPercentages: [0, 0],
        scale: 1,
      }}
    >
      Bonobo
    </ArtistInfoBadge>
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
  </div>
);

export const Info = () => (
  <Container>
    <ArtistInfo />
    <Heading level={1} styleVariant={'h2'}>
      Behind the Scenes Studio Tour
    </Heading>
    <Description>
      Exclusive access to a one on one call with me between recording sessions on my next album.
      With this token you’ll get 30 minutes of solo time with me and the band. To thank you for
      being pat of this community, you have first dibs to some new stuff. I designed some special
      merch with my friend Andy Warhol. These are limited edition 1/100 items. You can also purchase
      my latest track titled “Fragments” for digital download before it hits the stores next month.
    </Description>
  </Container>
);
