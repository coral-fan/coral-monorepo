import styled from '@emotion/styled';
import { QUERY } from 'styles';
import { Chat, WebPlayer } from './components';

const Container = styled.div`
  @media ${QUERY.TABLET} {
    grid-template-columns: 4fr 1fr;
    display: grid;
  }
`;

export interface StreamProps {
  mediaId: string;
}

export const Stream = ({ mediaId }: StreamProps) => (
  <Container>
    <WebPlayer mediaId={mediaId} />
    <Chat />
  </Container>
);
