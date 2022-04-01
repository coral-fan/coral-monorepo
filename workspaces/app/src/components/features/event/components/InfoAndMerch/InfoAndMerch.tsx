import styled from '@emotion/styled';
import { Info, Merch } from './components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const InfoAndMerch = () => (
  <Container>
    <Info />
    <Merch />
  </Container>
);
