import styled from '@emotion/styled';
import { Event } from 'libraries/models/event';
import { QUERY } from 'styles';
import { Chat, WebPlayer } from './components';

const Container = styled.div`
  @media ${QUERY.TABLET} {
    grid-template-columns: 4fr 1fr;
    display: grid;
  }
`;

export type StreamProps = Pick<Event, 'streamId' | 'chatId'>;

export const Stream = ({ streamId, chatId }: StreamProps) => (
  <Container>
    <WebPlayer mediaId={streamId} />
    <Chat id={chatId} />
  </Container>
);
