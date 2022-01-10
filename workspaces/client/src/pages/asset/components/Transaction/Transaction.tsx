import { Avatar } from 'components/ui/Profile';
import { Username } from 'components/ui/Profile/ProfileInfo/Username';
import { TimeElapsed } from 'components/ui/TimeElapsed';
import { Description } from './Description';
import styled from '@emotion/styled';

export interface TransactionProps {
  src: string;
  username: string;
  description: string;
  timestamp: string;
}

const TransactionContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
  align-items: flex-end;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const InfoDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Transaction = ({ src, username, description, timestamp }: TransactionProps) => {
  return (
    <TransactionContainer>
      <InfoContainer>
        <Avatar src={src} size={26} hasBorder={false} />
        <InfoDetailsContainer>
          <Description>{description}</Description>
          <Username size={'sm'}>{username}</Username>
        </InfoDetailsContainer>
      </InfoContainer>
      <TimeElapsed date={timestamp} />
    </TransactionContainer>
  );
};
