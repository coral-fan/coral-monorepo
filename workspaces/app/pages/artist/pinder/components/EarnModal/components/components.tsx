import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export const PrimaryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 10px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.md};
`;

export const Heading = styled.h1`
  font-size: ${tokens.font.size.xl};
  letter-spacing: ${tokens.font.letter_spacing.xl};
  line-height: ${tokens.font.line_height.xl};
`;

export const SubHeading = styled.h2`
  font-size: ${tokens.font.size.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
  line-height: ${tokens.font.line_height.lg};
  color: ${tokens.font.color.brand};
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 30px;
`;

export const BrandColor = styled.span`
  color: ${tokens.font.color.brand};
`;

export const CampaignNotActive = () => (
  <PrimaryContainer>
    <CenteredContainer>
      <Heading>
        This Campaign is currently <BrandColor>Inactive</BrandColor>
      </Heading>
    </CenteredContainer>
  </PrimaryContainer>
);

export const CampaignExpired = () => (
  <PrimaryContainer>
    <CenteredContainer>
      <Heading>
        This Campaign has <BrandColor>Ended</BrandColor>
      </Heading>
    </CenteredContainer>
  </PrimaryContainer>
);

interface HasVerifiedProps {
  points: number;
}
export const HasVerified = ({ points }: HasVerifiedProps) => (
  <PrimaryContainer>
    <CenteredContainer>
      <Heading>Thank You for Sharing & Verifying!</Heading>
      <SubHeading>You earned {points} points</SubHeading>
    </CenteredContainer>
  </PrimaryContainer>
);
