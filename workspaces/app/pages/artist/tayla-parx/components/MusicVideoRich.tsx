import styled from '@emotion/styled';
import { WebPlayer } from 'components/features/stream/components/StreamPlayer/components';
import { QUERY } from 'styles';
import { useTaylaParxStore } from '../store';
import { Earn } from './Earn';
import { LargeHeader } from './LargeHeader';
import { ShareAndEarnButton, ViewLink } from './pills';

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

const CTAContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const MusicVideoRich = () => {
  const {
    metadata: { ids },
  } = useTaylaParxStore();
  return (
    <Container>
      <LargeHeader>Watch Tayla Parx’s new music video “Rich”</LargeHeader>
      <CTAContainer>
        <Earn campaignId={ids.shareToEarnCampaign.musicVideoRich}>
          <ShareAndEarnButton points={2} />
        </Earn>
        <ViewLink href="#" />
      </CTAContainer>
      <WebPlayer mediaId="4d9ed8b51e1ee6c6c4/f69a45cc7fc1f763" />
    </Container>
  );
};
