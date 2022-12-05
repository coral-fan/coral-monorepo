import styled from '@emotion/styled';
import { CLIENT_ENVIRONMENT } from 'consts';
import tokens, { QUERY } from 'styles/tokens';
import { ContentImage } from './ContentImage';
import { Earn } from './Earn';
import { ShareAndEarnButton, ViewLink } from './pills';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--gap);
  @media ${QUERY.TABLET} {
    --gap: 100px;
  }
`;

const RowContainer = styled.div`
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

const Header = styled.h3`
  --font-size: ${tokens.font.size.xl};
  font-size: var(--font-size);
  font-weight: ${tokens.font.weight.bold};
  line-height: var(--font-size);

  @media ${QUERY.TABLET} {
    --font-size: ${tokens.font.size.xxl};
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

const Text = styled.p`
  --font-size: ${tokens.font.size.md};
  --line-height: ${tokens.font.line_height.md};

  font-size: var(--font-size);
  line-height: var(--line-height);

  @media ${QUERY.TABLET} {
    margin-top: 50px;
    --font-size: ${tokens.font.size.lg};
    --line-height: ${tokens.font.line_height.lg};
  }
`;

const Highlight = styled.span`
  font-weight: ${tokens.font.weight.bold};
  color: ${tokens.font.color.brand};
`;

const CAMPAIGN_ID =
  CLIENT_ENVIRONMENT === 'production' ? 'xqSPsvjg8w88feqYlCIc' : 'xqSPsvjg8w88feqYlCIc';

interface FeaturedContentProps {
  doesOwnPinderNft: boolean;
}

export const FeaturedContent = ({ doesOwnPinderNft }: FeaturedContentProps) => (
  <Container>
    <RowContainer>
      <ContentImage src="/images/pinder/the-mop-sound-xyz.png" />
      <Content>
        <Header>Promote my Upcoming Drop On sound.xyz</Header>
        <CTAContainer>
          <Earn campaignId={CAMPAIGN_ID} doesOwnPinderNft={doesOwnPinderNft}>
            <ShareAndEarnButton points={(doesOwnPinderNft ? 2 : 1) * 20} />
          </Earn>
          <ViewLink href="https://www.sound.xyz/pinder/the-mop" openInNewTab />
        </CTAContainer>
        <Text>
          Share now and all holders of the “The Mop” NFT dropped on sound.xyz will recieve{' '}
          <Highlight>2x rewards</Highlight> if you claim the NFT. Be sure to sign up on Coral with
          the same wallet you claim the NFT.
        </Text>
      </Content>
    </RowContainer>
  </Container>
);
