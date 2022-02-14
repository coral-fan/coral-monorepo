import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { WebPlayer } from './components/WebPlayer/WebPlayer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface EventPageProps {
  eventId: string;
  mediaResourceUrl: string;
}

export default function EventPage({ eventId, mediaResourceUrl }: EventPageProps) {
  return (
    <Container>
      <WebPlayer url={mediaResourceUrl} />
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

  const mediaResourceUrl = 'https://cdn.jwplayer.com/manifests/dSKXzBSv.m3u8';

  return {
    props: {
      eventId,
      mediaResourceUrl,
    },
  };
};
