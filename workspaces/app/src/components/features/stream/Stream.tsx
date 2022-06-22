import { GetServerSideProps } from 'next';
import styled from '@emotion/styled';
import { GatedContent } from 'components/ui';
import {
  BuyTicketButton,
  Stream,
  InfoAndMerch,
  InfoAndMerchProps,
  StreamProps,
} from './components';
import { Event } from 'libraries/models/stream';
import { Collection, getCollection, getArtist } from 'libraries/models';
import { getStreamData } from 'libraries/models/stream/utils';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

const StreamContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

type StreamPageProps = InfoAndMerchProps &
  StreamProps &
  Pick<Event, 'id' | 'accessGrantingTokenAddresses'>;

export const StreamPage = ({
  accessGrantingTokenAddresses,
  sproutMediaId,
  chatId,
  artistId,
  artistName,
  artistProfilePhoto,
  artistSocialHandles,
  name,
  description,
  exclusiveCollections,
}: StreamPageProps) => {
  return (
    <GatedContent
      accessGrantingTokenAddresses={accessGrantingTokenAddresses}
      accessDeniedModalProps={{
        title: 'This is a private stream',
        message:
          'This stream is for members and ticket holders only. Buy a ticket now for special and exclusive perks.',
        actionElement: <BuyTicketButton collectionId={accessGrantingTokenAddresses[0]} />,
      }}
    >
      <StreamContainer>
        <Stream sproutMediaId={sproutMediaId} chatId={chatId} />
        <InfoAndMerch
          name={name}
          description={description}
          artistId={artistId}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          artistSocialHandles={artistSocialHandles}
          exclusiveCollections={exclusiveCollections}
        />
      </StreamContainer>
    </GatedContent>
  );
};

interface EventParams extends NextParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<StreamPageProps, EventParams> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  const streamData = await getStreamData(id);

  if (streamData === undefined) {
    return {
      notFound: true,
    };
  }

  const { artistId, exclusiveCollectionIds, ...stream } = streamData;

  const artistData = await getArtist(artistId);

  // TODO: think through how to deal with this
  if (!artistData) {
    throw `Artist with ${artistId} doesn't exist.`;
  }

  const {
    name: artistName,
    profilePhoto: artistProfilePhoto,
    socialHandles: artistSocialHandles,
  } = artistData;

  const exclusiveCollections =
    exclusiveCollectionIds === null
      ? null
      : // TODO: Refactor Promise.allSettled with RxJs
        (await Promise.allSettled(exclusiveCollectionIds.map(getCollection)))
          .filter(
            (result): result is PromiseFulfilledResult<Collection> => result.status === 'fulfilled'
          )
          .map((result) => result.value);

  return {
    props: {
      id,
      ...stream,
      exclusiveCollections,
      artistId,
      artistName,
      artistProfilePhoto,
      artistSocialHandles,
    },
  };
};
