import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { WebPlayer } from './components/WebPlayer/WebPlayer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface EventPageProps {
  mediaId: string;
}

export default function EventPage({ mediaId }: EventPageProps) {
  return (
    <Container>
      <WebPlayer mediaId={mediaId} />
    </Container>
  );
}

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

  // Make database call with eventId to get mediaId.
  const mediaId = 'mediaIdFromDatabase';

  return {
    props: {
      mediaId,
    },
  };
};
