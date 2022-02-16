import { Avatar } from 'components/ui/profile';
import { Username } from 'components/ui/profile/ProfileInfo/Username';
import { TimeElapsed } from 'components/ui/TimeElapsed';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export interface ItemProps {
  src: string;
  username: string;
  description: string;
  timestamp: string;
}

const ItemContainer = styled.div`
  display: flex;
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: solid 1px ${tokens.color.border.secondary};
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
  color: ${tokens.color.font.primary};
  line-height: 18px;
  justify-content: flex-end;
`;

export const Item = ({ src, username, description, timestamp }: ItemProps) => {
  return (
    <ItemContainer>
      <InfoContainer>
        <Avatar src={src} size={26} hasBorder={false} />
        <InfoDetailsContainer>
          <Description>{description}</Description>
          <Username size={'sm'}>{username}</Username>
        </InfoDetailsContainer>
      </InfoContainer>
      <TimeElapsed date={timestamp} />
    </ItemContainer>
  );
};
