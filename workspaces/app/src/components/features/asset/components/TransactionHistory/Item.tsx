import { Avatar } from 'components/ui/profile';
import { Username } from 'components/ui/profile/ProfileInfo/Username';
import { TimeElapsed } from 'components/ui/TimeElapsed';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { ProfilePhoto } from 'libraries/models';

export interface ItemProps {
  username: string;
  profilePhoto: ProfilePhoto;
  description: string;
  timestamp: string;
}

const ItemContainer = styled.div`
  display: flex;
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: solid 1px ${tokens.border.color.secondary};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const InfoDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  size: 14px;
  font-weight: 400;
  color: ${tokens.font.color.primary};
  line-height: 18px;
  justify-content: flex-end;
`;

export const Item = ({ username, profilePhoto, description, timestamp }: ItemProps) => {
  return (
    <ItemContainer>
      <InfoContainer>
        <Avatar size={26} {...profilePhoto} />
        <InfoDetailsContainer>
          <Description>{description}</Description>
          <Username size={'sm'}>{username}</Username>
        </InfoDetailsContainer>
      </InfoContainer>
      <TimeElapsed date={timestamp} />
    </ItemContainer>
  );
};
