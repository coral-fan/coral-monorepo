import { Avatar } from 'components/ui/Profile';
import { Username } from 'components/ui/Profile/ProfileInfo/Username';
import { TimeElapsed } from 'components/ui/TimeElapsed';
import { Flex } from 'components/layout';

export interface TransactionItemProps {
  src: string;
  username: string;
  txDesc: string;
  txTimestamp: string;
}

import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const Transaction = styled.div`
  size: 14px;
  color: ${tokens.color.white};
  line-height: 18px;
  justify-content: flex-end;
`;

export const TransactionItem = ({ src, username, txDesc, txTimestamp }: TransactionItemProps) => {
  return (
    <Flex width={'100%'} gap={'15px'}>
      <Avatar src={src} size={26} hasBorder={false} />
      <Flex justifyContent={'space-between'} width={'100%'}>
        <Flex direction={'column'}>
          <Transaction>{txDesc}</Transaction>
          <Username size={'sm'}>{username}</Username>
        </Flex>
        <Flex alignItems={'flex-end'}>
          <TimeElapsed date={txTimestamp} />
        </Flex>
      </Flex>
    </Flex>
  );
};
