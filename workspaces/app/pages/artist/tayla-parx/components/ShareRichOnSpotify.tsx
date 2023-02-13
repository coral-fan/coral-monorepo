import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';
import { useTaylaParxStore } from '../store';
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

export const ShareRichOnSpotify = () => {
  const {
    metadata: { id },
  } = useTaylaParxStore();

  return (
    <Container>
      <ContentImage src="/images/tayla-parx/rich-album-art.jpeg" />
      <Content>
        <Header>Share a link to stream “Rich” on Spotify.</Header>
        <Earn campaignId={id.shareToEarnCampaign.forWhatItsWorthOnSpotify}>
          <ShareAndEarnButton />
        </Earn>
      </Content>
    </Container>
  );
};
