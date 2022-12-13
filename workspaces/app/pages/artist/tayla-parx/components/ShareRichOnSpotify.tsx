import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';
import { ContentImage } from './ContentImage';
import { Earn } from './Earn';
import { ShareAndEarnButton } from './pills';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding-top: 20px;
  border-top: solid rgba(240, 240, 240, 0.2) 1px;

  --gap: 10px;
  gap: var(--gap);

  @media ${QUERY.TABLET} {
    --gap: 20px;
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

const Header = styled.h3`
  --font-size: ${tokens.font.size.md};
  font-size: var(--font-size);
  font-weight: ${tokens.font.weight.bold};
  line-height: var(--font-size);

  @media ${QUERY.TABLET} {
    --font-size: ${tokens.font.size.xl};
  }
`;

export const ShareRichOnSpotify = () => (
  <Container>
    <ContentImage src="https://firebasestorage.googleapis.com/v0/b/coral-fan.appspot.com/o/artists%2Ftayla-parx%2FTaylaParx-RICH-Thumbnail.jpg?alt=media&token=3bb9b57f-c6dd-4a1c-b530-7ecf4b0c3995" />
    <Content>
      <Header>Share a link to stream “Rich” on Spotify.</Header>
      <Earn campaignId="xqSPsvjg8w88feqYlCIc">
        <ShareAndEarnButton points={2} />
      </Earn>
    </Content>
  </Container>
);
