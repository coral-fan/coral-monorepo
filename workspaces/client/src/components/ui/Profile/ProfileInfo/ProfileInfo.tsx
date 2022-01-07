import { Flex } from 'components/layout';
import { Avatar } from 'components/ui/Profile';
import { profileInfoSizeDictionary } from './consts';
import { Size } from './types';
import { Name } from './Name';
import { Username } from './Username';

export interface ProfileInfoProps {
  name: string;
  username: string;
  src: string;
  size: Size;
}

export const ProfileInfo = ({ src, name, username, size }: ProfileInfoProps) => {
  const gapSize = `${profileInfoSizeDictionary[size].avatarGap}px`;
  const avatarSize = profileInfoSizeDictionary[size].avatarSize;

  return (
    <Flex direction={'row'} alignItems={'center'} gap={gapSize} width={'100%'}>
      <Avatar size={avatarSize} src={src} hasBorder={false} />
      <Flex direction={'column'}>
        <Name size={size}>{name}</Name>
        <Username size={size}>{username}</Username>
      </Flex>
    </Flex>
  );
};
