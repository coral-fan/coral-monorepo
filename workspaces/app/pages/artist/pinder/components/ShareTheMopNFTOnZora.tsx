import styled from '@emotion/styled';
import { CLIENT_ENVIRONMENT } from 'consts';
import tokens, { QUERY } from 'styles/tokens';
import { ContentImage } from './ContentImage';
import { Earn } from './Earn';
import { ShareAndEarnButton, ViewLink } from './pills';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

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

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${QUERY.TABLET} {
    flex-direction: row;
  }
`;

const CAMPAIGN_ID =
  CLIENT_ENVIRONMENT === 'production' ? 'xqSPsvjg8w88feqYlCIc' : 'xqSPsvjg8w88feqYlCIc';

interface ShareTheMopNFTOnZoraProps {
  doesOwnPinderNft: boolean;
}

export const ShareTheMopNFTOnZora = ({ doesOwnPinderNft }: ShareTheMopNFTOnZoraProps) => (
  <Container>
    <ContentImage src="/images/pinder/the-mop-zora.png" />
    <Content>
      <Header>Share a link to claim the Visual NFT “The Mop” on Zora</Header>
      {/* <CTAContainer>
        <Earn campaignId={CAMPAIGN_ID} doesOwnPinderNft={doesOwnPinderNft}>
          <ShareAndEarnButton points={(doesOwnPinderNft ? 2 : 1) * 20} />
        </Earn>
      </CTAContainer> */}
    </Content>
  </Container>
);
