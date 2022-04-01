import styled from '@emotion/styled';
import { Info, Merch } from './components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoAndMerch = () => (
  <Container>
    <Info />
    <Merch />
  </Container>
);
