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
  CLIENT_ENVIRONMENT === 'production' ? 'diCKL40bt3ofgHW7eQFU' : 'ukgEh7yJJABKyxRRf60l';

const VINYL_NFT_CONTRACT_ADDRESS =
  CLIENT_ENVIRONMENT === 'production'
    ? '0x15564E2AaE9B7EC061e38db58709ea69241DDD10'
    : '0xBC7f4e6b489d19292D1EDFffbAadf48CE56E8CC8';
interface CommunityBenefitsProps {
  doesOwnPinderNft: boolean;
}

export const CommunityBenefits = ({ doesOwnPinderNft }: CommunityBenefitsProps) => (
  <Container>
    <RowContainer>
      <ContentImage src="/images/pinder/the-mop-sound-xyz.png" />
      <Content>
        <Header>2x Points for “The Mop” NFT Holders.</Header>
        <CTAContainer>
          <Earn campaignId={CAMPAIGN_ID} doesOwnPinderNft={doesOwnPinderNft}>
            <ShareAndEarnButton points={20} />
          </Earn>
          <ViewLink href="https://www.sound.xyz/pinder/the-mop" openInNewTab>
            Claim on sound.xyz
          </ViewLink>
        </CTAContainer>
        <Text>
          All holders of “The Mop” NFT recently dropped on sound.xyz will recieve{' '}
          <Highlight>2x</Highlight> Coral Points when then share. Make sure to use the same wallet.
        </Text>
      </Content>
    </RowContainer>
    <RowContainer>
      <Content>
        <Header>Earn A Free Vinyl Pressing of &quot;Everything Cost&quot; 12&quot;</Header>
        <ViewLink href={`/collection/${VINYL_NFT_CONTRACT_ADDRESS}`}>Claim On Coral</ViewLink>
        <Text>
          {
            'To say thank you for your support and reward you for holding "The Mop" NFT, you can claim a free vinyl pressing of "Everything Cost".'
          }
        </Text>
      </Content>
      <ContentImage src="/images/pinder/free-vinyl-press.gif" />
    </RowContainer>
  </Container>
);
