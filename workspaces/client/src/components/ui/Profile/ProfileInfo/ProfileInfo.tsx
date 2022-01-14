import { Avatar } from 'components/ui/Profile';
import { profileInfoSizeDictionary } from './consts';
import { Size } from './types';
import { Name } from './Name';
import { Username } from './Username';
import styled from '@emotion/styled';

export interface ProfileInfoProps {
  name: string;
  username: string;
  src: string;
  size: Size;
}

interface ContainerProp {
  size: Size;
}

const Container = styled.div<ContainerProp>`
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${(props) => profileInfoSizeDictionary[props.size].avatarGap}px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileInfo = ({ src, name, username, size }: ProfileInfoProps) => {
  const avatarSize = profileInfoSizeDictionary[size].avatarSize;

  return (
    <Container size={size}>
      <Avatar size={avatarSize} src={src} hasBorder={false} />
      <NameContainer>
        <Name size={size}>{name}</Name>
        <Username size={size}>{username}</Username>
      </NameContainer>
    </Container>
  );
};
