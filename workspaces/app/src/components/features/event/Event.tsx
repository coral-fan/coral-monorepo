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
import { getDocumentData } from 'libraries/firebase';
import { Event, EventData } from 'libraries/models/event';
import { Collection, getCollection, getArtist } from 'libraries/models';

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
type EventPageProps = InfoAndMerchProps & StreamProps & Pick<Event, 'id' | 'allowedCollectionIds'>;

export const EventPage = ({
  allowedCollectionIds,
  id,
  streamId,
  chatId,
  artistId,
  artistName,
  artistProfilePhoto,
  artistSocialHandles,
  name,
  description,
  exclusiveCollections,
}: EventPageProps) => {
  return (
    <GatedContent
      accessGrantingTokens={allowedCollectionIds}
      accessDeniedModalProps={{
        title: 'This is a private event',
        message:
          'This event is for members and ticket holders only. Buy a ticket now for special and exclusive perks.',
        actionElement: <BuyTicketButton collectionId={id} />,
      }}
    >
      <EventContainer>
        <Stream streamId={streamId} chatId={chatId} />
        <InfoAndMerch
          name={name}
          description={description}
          artistId={artistId}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          artistSocialHandles={artistSocialHandles}
          exclusiveCollections={exclusiveCollections}
        />
      </EventContainer>
    </GatedContent>
  );
};

export const getServerSideProps: GetServerSideProps<EventPageProps, { id: string }> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  const eventData = await getDocumentData<EventData>('events', id);

  if (!eventData) {
    return {
      notFound: true,
    };
  }

  const { artistId, exclusiveCollectionIds, ...event } = eventData;

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
      : (await Promise.allSettled(exclusiveCollectionIds.map(getCollection)))
          .filter(
            (result): result is PromiseFulfilledResult<Collection> => result.status === 'fulfilled'
          )
          .map((result) => result.value);

  return {
    props: {
      ...event,
      exclusiveCollections,
      artistId,
      artistName,
      artistProfilePhoto,
      artistSocialHandles,
    },
  };
};
