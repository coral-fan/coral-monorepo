import styled from '@emotion/styled';
import { CtaButton } from 'components/ui';
import { POINTS_AVAX_VALUE } from 'consts';
import tokens from 'styles/tokens';

interface PointsProps {
  pointsEarned: number;
}

const PointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const PointsDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: solid 1px ${tokens.border.color.secondary};
  padding-top: 10px;
`;

const PointsDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PointsHeadings = styled.span`
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  line-height: ${tokens.font.line_height.xs};
  color: ${tokens.font.color.secondary};
  text-transform: uppercase;
`;

const PointsValue = styled.span`
  font-size: ${tokens.font.size.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
  line-height: ${tokens.font.line_height.lg};
  color: ${tokens.font.color.primary};
  text-transform: uppercase;
`;

// TODO: Handle Redemption Logic in CtaButton
export const Points = ({ pointsEarned }: PointsProps) => (
  <PointsContainer>
    <PointsDetailsContainer>
      <PointsDetailContainer>
        <PointsHeadings>coral points earned</PointsHeadings>
        <PointsValue>{pointsEarned} PTS</PointsValue>
      </PointsDetailContainer>
      <PointsDetailContainer>
        <PointsHeadings>avax value</PointsHeadings>
        <PointsValue>{pointsEarned / POINTS_AVAX_VALUE} AVAX</PointsValue>
      </PointsDetailContainer>
    </PointsDetailsContainer>
    <CtaButton onClick={() => console.log('Redeem my points!')}>redeem my points</CtaButton>
  </PointsContainer>
);
