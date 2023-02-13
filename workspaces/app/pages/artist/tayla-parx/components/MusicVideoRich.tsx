import styled from '@emotion/styled';
import { WebPlayer } from 'components/features/stream/components/StreamPlayer/components';
import { QUERY } from 'styles';
import { LargeHeader } from './LargeHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  --gap: 10px;
  gap: var(--gap);
  @media ${QUERY.TABLET} {
    --gap: 20px;
    margin-bottom: 150px;
  }
`;

export const MusicVideoRich = () => (
  <Container>
    <LargeHeader>Watch Tayla Parx’s new music video “Rich”</LargeHeader>
    <WebPlayer mediaId="ac9fdfb31a11efc125/0de95e08f5cfb66f" />
  </Container>
);
