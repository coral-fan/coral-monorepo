import styled from '@emotion/styled';
import { QUERY } from 'styles/tokens';
import { ContentImage } from './ContentImage';
import { LargeHeader } from './LargeHeader';
import { ViewLink } from './pills';

const Container = styled.div`
  display: flex;
  --flex-direction: column;
  flex-direction: var(--flex-direction);

  --gap: 10px;
  gap: var(--gap);
  @media ${QUERY.TABLET} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  @media ${QUERY.TABLET} {
    gap: var(--gap);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const ExclusiveContent = () => (
  <Container>
    <ContentImage src="/images/tayla-parx/exclusive-content-photo.png" />
    <Content>
      <LargeHeader>BTS of Making the music Video “Rich” </LargeHeader>
      <ViewLink href="#" />
    </Content>
  </Container>
);
