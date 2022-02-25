import { Avatar } from '../Avatar';
import { profileInfoSizeDictionary } from './consts';
import { Size } from './types';
import { Name } from './Name';
import { Username } from './Username';
import styled from '@emotion/styled';
import { ProfilePhoto } from 'libraries/models';

export interface ProfileInfoProps extends ProfilePhoto {
  name: string;
  username: string;
  size: Size;
}

interface ContainerProp {
  size: Size;
}

const ProfileInfoContainer = styled.div<ContainerProp>`
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${(props) => profileInfoSizeDictionary[props.size].avatarGap}px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileInfo = ({
  name,
  username,
  size,
  offsetPercentages,
  scale,
  src,
}: ProfileInfoProps) => {
  const avatarSize = profileInfoSizeDictionary[size].avatarSize;

  const profilePhoto = { offsetPercentages, scale, src };

  return (
    <ProfileInfoContainer size={size}>
      <Avatar size={avatarSize} {...profilePhoto} />
      <NameContainer>
        <Name size={size}>{name}</Name>
        <Username size={size}>{username}</Username>
      </NameContainer>
    </ProfileInfoContainer>
  );
};
