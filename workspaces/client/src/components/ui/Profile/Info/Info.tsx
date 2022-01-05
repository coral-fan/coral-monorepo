import styled from '@emotion/styled';
import { Flex } from 'components/layout';
import tokens from 'styles/tokens';

const NameWrapper = styled.div`
  font-size: 14px;
  color: ${tokens.color.white};
  line-height: 18px;
`;

const UserNameWrapper = styled.div`
  font-size: 10px;
  color: ${tokens.color.gray};
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export interface InfoProps {
  name: string;
  username: string;
}

export const Info = ({ name, username }: InfoProps) => {
  return (
    <Flex direction={'column'} justifyContent={'space-between'}>
      <NameWrapper>{name}</NameWrapper>
      <UserNameWrapper>{username}</UserNameWrapper>
    </Flex>
  );
};
