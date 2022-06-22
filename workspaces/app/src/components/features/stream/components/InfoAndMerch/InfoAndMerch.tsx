import styled from '@emotion/styled';
import { Heading } from 'components/ui';
import { Stream } from 'libraries/models/stream';
import { useIsDesktop } from 'libraries/window';
import tokens, { QUERY } from 'styles/tokens';
import { ArtistInfo, Merch } from './components';

const EventInfoAndMerchContainer = styled.div`
  --gap: 32px;
  display: flex;
  flex-direction: column;
  @media ${QUERY.LAPTOP} {
    flex-direction: row;
    padding-top: 16px;
    --gap: 64px;
  }

  gap: var(--gap);
`;

const EventInfo = styled.p`
  flex: 1;
  --font-size: ${tokens.font.size.sm};
  @media ${QUERY.LAPTOP} {
    --font-size: ${tokens.font.size.md};
  }

  font-size: var(--font-size);
`;

export type InfoAndMerchProps = Pick<
  Stream,
  | 'name'
  | 'description'
  | 'exclusiveCollections'
  | 'artistId'
  | 'artistName'
  | 'artistProfilePhoto'
  | 'artistSocialHandles'
>;

export const InfoAndMerch = ({
  name,
  description,
  artistId,
  artistName,
  artistProfilePhoto,
  artistSocialHandles,
  exclusiveCollections,
}: InfoAndMerchProps) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <Heading level={1} styleVariant={isDesktop ? 'h1' : 'h3'}>
        {name}
      </Heading>
      <ArtistInfo
        id={artistId}
        name={artistName}
        profilePhoto={artistProfilePhoto}
        socialHandles={artistSocialHandles}
      />
      <EventInfoAndMerchContainer>
        <EventInfo>{description}</EventInfo>
        {exclusiveCollections && <Merch exclusiveCollections={exclusiveCollections} />}
      </EventInfoAndMerchContainer>
    </>
  );
};
