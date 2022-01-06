import styled from '@emotion/styled';
import { Flex } from 'components/layout';
import tokens from 'styles/tokens';
import { Avatar } from 'components/ui/Profile';
import { userInfoSizeDictionary } from './consts';
import { InfoContainerProps, NameWrapperProps, InfoProps } from './types';

const InfoContainer = styled(Flex)<InfoContainerProps>`
  width: 100%;
  gap: ${({ size }) => `${userInfoSizeDictionary[size].avatarGap}px`};
`;

const NameWrapper = styled.div<NameWrapperProps>`
  font-size: ${({ size }) => `${userInfoSizeDictionary[size].nameFontSize}px`};
  color: ${tokens.color.white};
  line-height: ${({ size }) => `${userInfoSizeDictionary[size].nameLineHeight}px`};
`;

const UsernameWrapper = styled.div<NameWrapperProps>`
  font-size: 10px;
  font-weight: bold;
  color: ${tokens.color.gray};
  line-height: ${({ size }) => `${userInfoSizeDictionary[size].userNameLineHeight}px`};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Info = ({ src, name, username, size }: InfoProps) => {
  return (
    <InfoContainer direction={'row'} alignItems={'center'} size={size}>
      <Avatar size={userInfoSizeDictionary[size].avatarSize} src={src} hasBorder={false} />
      <Flex direction={'column'}>
        <NameWrapper size={size}>{name}</NameWrapper>
        <UsernameWrapper size={size}>{username}</UsernameWrapper>
      </Flex>
    </InfoContainer>
  );
};
