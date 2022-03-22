import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { WebPlayer } from './components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface EventPageProps {
  mediaId: string;
}

export const EventPage = ({ mediaId }: EventPageProps) => {
  return (
    <Container>
      <WebPlayer mediaId={mediaId} />
    </Container>
  );
};

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
  const mediaId = 'd39eddb21f19e4c65a/095e73334ab41c6b';

  return {
    props: {
      mediaId,
    },
  };
};
