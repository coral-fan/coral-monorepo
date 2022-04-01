import styled from '@emotion/styled';
import { Heading } from 'components/ui';
import { useIsDesktop } from 'libraries/window';
import tokens, { QUERY } from 'styles/tokens';
import { ArtistInfo, Merch } from './components';

const EventInfoAndMerchContainer = styled.div`
  --gap: 32px;
  display: flex;
  flex-direction: column;
  @media ${QUERY.LAPTOP} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 16px;
    --gap: 64px;
  }

  gap: var(--gap);
`;

const EventInfo = styled.p`
  --font-size: ${tokens.font.size.sm};
  @media ${QUERY.LAPTOP} {
    --font-size: ${tokens.font.size.md};
  }

  font-size: var(--font-size);
`;

export const InfoAndMerch = () => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <Heading level={1} styleVariant={isDesktop ? 'h1' : 'h3'}>
        Behind the Scenes Studio Tour
      </Heading>
      <ArtistInfo />
      <EventInfoAndMerchContainer>
        <EventInfo>
          Exclusive access to a one on one call with me between recording sessions on my next album.
          With this token you’ll get 30 minutes of solo time with me and the band. To thank you for
          being pat of this community, you have first dibs to some new stuff. I designed some
          special merch with my friend Andy Warhol. These are limited edition 1/100 items. You can
          also purchase my latest track titled “Fragments” for digital download before it hits the
          stores next month.
        </EventInfo>
        <Merch />
      </EventInfoAndMerchContainer>
    </>
  );
};
