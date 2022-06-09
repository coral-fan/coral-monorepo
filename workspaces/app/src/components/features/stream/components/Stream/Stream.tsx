import styled from '@emotion/styled';
import { Event } from 'libraries/models/stream';
import { QUERY } from 'styles';
import { Chat, WebPlayer } from './components';

const Container = styled.div`
  @media ${QUERY.TABLET} {
    grid-template-columns: 4fr 1fr;
    display: grid;
  }
`;

export type StreamProps = Pick<Event, 'sproutMediaId' | 'chatId'>;

export const Stream = ({ sproutMediaId, chatId }: StreamProps) => (
  <Container>
    <WebPlayer mediaId={sproutMediaId} />
    <Chat id={chatId} />
  </Container>
);
