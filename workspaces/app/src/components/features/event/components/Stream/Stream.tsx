import styled from '@emotion/styled';
import { Chat, WebPlayer } from './components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
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
