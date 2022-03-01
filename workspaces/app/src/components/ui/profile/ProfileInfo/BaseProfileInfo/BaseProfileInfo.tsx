import { Avatar } from 'components/ui';
import { BaseProfileInfoProps } from '../types';
import styled from '@emotion/styled';
import { FC } from 'react';
import tokens from 'styles/tokens';

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
  font-weight: ${tokens.font.weight.bold};
`;

const NameWrapper = styled.div`
  color: ${tokens.font.color.primary};
`;

const SecondaryInfoWrapper = styled.div`
  color: ${tokens.font.color.secondary};
`;

export const BaseProfileInfo: FC<BaseProfileInfoProps> = ({ profilePhoto, username, children }) => {
  return (
    <ProfileInfoContainer>
      <Avatar size={50} {...profilePhoto} />
      <InfoContainer>
        <NameWrapper>{username}</NameWrapper>
        <SecondaryInfoWrapper>{children}</SecondaryInfoWrapper>
      </InfoContainer>
    </ProfileInfoContainer>
  );
};
