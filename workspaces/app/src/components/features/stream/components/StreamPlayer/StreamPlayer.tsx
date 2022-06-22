import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Stream } from 'libraries/models';
import { QUERY } from 'styles';
import { Chat, WebPlayer } from './components';

const Container = styled.div<{ chatId: Stream['chatId'] }>`
  ${({ chatId }) =>
    chatId &&
    css`
      @media ${QUERY.TABLET} {
        grid-template-columns: 4fr 1fr;
        display: grid;
      }
    `}
`;

export type StreamProps = Pick<Stream, 'sproutMediaId' | 'chatId'>;

export const StreamPlayer = ({ sproutMediaId, chatId }: StreamProps) => (
  <Container chatId={chatId}>
    <WebPlayer mediaId={sproutMediaId} />
    {chatId && <Chat id={chatId} />}
  </Container>
);
