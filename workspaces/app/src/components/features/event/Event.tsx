import { GetServerSideProps } from 'next';
import styled from '@emotion/styled';
import { GatedContent } from 'components/ui';
import { BuyTicketButton, Stream, InfoAndMerch } from './components';

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
interface EventPageProps {
  mediaId: string;
}

export const EventPage = ({ mediaId }: EventPageProps) => (
  <GatedContent
    accessGrantingNfts={['0x71a517b09a62e3ddbdfab02d13bf237ad602f21b']}
    accessDeniedModalProps={{
      title: 'This is a private event',
      message:
        'This event is for members and ticket holders only. Buy a ticket now for special and exclusive perks.',
      actionElement: <BuyTicketButton collectionId="1" />,
    }}
  >
    <EventContainer>
      <Stream mediaId={mediaId} />
      <InfoAndMerch />
    </EventContainer>
  </GatedContent>
);

export const getServerSideProps: GetServerSideProps<EventPageProps, { eventId: string }> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { eventId } = params;

  // For SproutVideo, mediaId is available after creating a new live stream
  const mediaId = '799edeb6181ce1c4f0/11b5b9e45f6a3dbb';

  return {
    props: {
      mediaId,
    },
  };
};
