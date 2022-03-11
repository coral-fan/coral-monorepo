import { Avatar } from 'components/ui';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { Photo } from 'libraries/models';

const ProfileInfoContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
`;

const NameWrapper = styled.div`
  color: ${tokens.font.color.primary};
  font-weight: ${tokens.font.weight.bold};
`;

const SecondaryInfoWrapper = styled.div`
  color: ${tokens.font.color.brand};
  text-transform: uppercase;
  font-size: ${tokens.font.size.xs};
  font-weight: ${tokens.font.weight.normal};
`;

export interface ProfileInfoProps {
  profilePhoto: Photo;
  username: string;
  secondaryInfo: string;
}

export const ProfileInfo = ({ profilePhoto, username, secondaryInfo }: ProfileInfoProps) => {
  return (
    <ProfileInfoContainer>
      <Avatar size={50} {...profilePhoto} />
      <InfoContainer>
        <NameWrapper>{username}</NameWrapper>
        <SecondaryInfoWrapper>{secondaryInfo}</SecondaryInfoWrapper>
      </InfoContainer>
    </ProfileInfoContainer>
  );
};
